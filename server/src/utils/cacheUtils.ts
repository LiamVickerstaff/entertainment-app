import { redisClient } from "..";
import { shuffleArr } from "./generalUtils";

// This function checks the redis cache first for data, otherwise fetches
// fresh data from the api
export const cacheThenApiFetch = async (
  CACHE_KEY: string,
  fetchRequests: Promise<Response>[],
  ttl: number
): Promise<any[] | null> => {
  try {
    // First check cache for data
    let cachedData: string | null = null;

    try {
      cachedData = await redisClient.get(CACHE_KEY);
    } catch (redisErr) {
      console.error(`Redis GET error for ${CACHE_KEY}:`, redisErr);
    }

    // If cached data found, return JSON data to route
    if (cachedData) {
      console.log(`Sending cached data for ${CACHE_KEY}`);
      return JSON.parse(cachedData);
    }

    // Run all fetch requests asynchronously
    const responses = await Promise.all(fetchRequests);

    // Check if any responses failed
    const failed = responses.find((res) => !res.ok);

    // Handle any failed fetches
    if (failed) {
      console.error("One or more TMBD fetches failed:", {
        status: failed.status,
        message: await failed.text(),
      });
      return null;
    }

    // Convert all responses to JSON
    const jsonResults = await Promise.all(
      responses.map((response) => response.json())
    );

    // merge and shuffle data
    const merged = jsonResults.flatMap((json) => json.results);
    const data = shuffleArr(merged);

    // Cache new fresh data to redis
    try {
      await redisClient.set(CACHE_KEY, JSON.stringify(data), { EX: ttl });
    } catch (redisErr) {
      console.error(`Redis SET error for ${CACHE_KEY}:`, redisErr);
    }

    // Return fresh JSON data
    return data;
  } catch (error) {
    console.error(`cacheThenApiFetch error for ${CACHE_KEY}:`, error);
    return null;
  }
};
