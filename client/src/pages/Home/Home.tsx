import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";
import TrendingContentCard from "../../components/ContentDisplayCards/TrendingContentCard/TrendingContentCard";
import styles from "./Home.module.css";

import { useEffect, useState } from "react";
import {
  fetchRecommendedMedia,
  fetchTrendingMedia,
} from "../../api/tmdbFetches";
import type { MediaData } from "../../types/mediaDataTypes";
import { normalizeContentData } from "../../utils/tmbdUtils";

export default function Home() {
  const [trendingData, setTrendingData] = useState<MediaData[] | []>([]);
  const [recommendedData, setRecommendedData] = useState<MediaData[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrending() {
      try {
        const data = await fetchTrendingMedia();
        console.log("recieved list");
        const normalizedData = normalizeContentData(data);
        setTrendingData(normalizedData);
      } catch (err) {
        const errorMessage =
          (err as Error).message ||
          "Whoops! We can't find any movies right now";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    async function loadRecommended() {
      try {
        const data = await fetchRecommendedMedia();
        console.log("recieved list");
        const normalizedData = normalizeContentData(data);
        setRecommendedData(normalizedData);
      } catch (err) {
        const errorMessage =
          (err as Error).message ||
          "Whoops! We can't find any movies right now";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    loadTrending();
    loadRecommended();
  }, []);

  useEffect(() => {
    console.log("trending", trendingData);
    console.log("recommend", recommendedData);
  }, [trendingData, recommendedData]);

  if (loading)
    return (
      <div className={styles.container}>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.container}>
        <p>
          Oops! We can't find any media content at the moment. Please try again
          later!
        </p>
      </div>
    );

  return (
    <div className={styles.homeContainer}>
      <div className={styles.trendingContainer}>
        <h2>Trending</h2>
        <div className={styles.carousel}>
          {trendingData &&
            trendingData.map((content, index) => (
              <TrendingContentCard key={index} content={content} />
            ))}
        </div>
      </div>
      <div className={styles.recommendedContainer}>
        <h2>Recommended for you</h2>
        <div className={styles.recommendedGrid}>
          {recommendedData &&
            recommendedData.map((content, index) => (
              <RegularContentCard key={index} content={content} />
            ))}
        </div>
      </div>
    </div>
  );
}
