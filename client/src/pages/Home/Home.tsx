import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";
import TrendingContentCard from "../../components/ContentDisplayCards/TrendingContentCard/TrendingContentCard";
import styles from "./Home.module.css";

import { useEffect, useState } from "react";
import {
  fetchRecommendedMedia,
  fetchTrendingMedia,
} from "../../api/tmdbFetches";
import type { MixedMediaType } from "../../types/mediaDataTypes";

export default function Home() {
  const [trendingData, setTrendingData] = useState<MixedMediaType[] | []>([]);
  const [recommendedData, setRecommendedData] = useState<MixedMediaType[] | []>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrending() {
      try {
        const data = await fetchTrendingMedia();
        console.log("recieved list");
        setTrendingData(data);
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
        setRecommendedData(data);
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
        <h2>Trending</h2>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.container}>
        <h2>Trending</h2>
        <p>
          Oops! We can't find any movies at the moment. Please try again later!
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
              <TrendingContentCard
                key={index}
                title={content?.title || content.name}
                imgUrl={`https://image.tmdb.org/t/p/w780${content.poster_path}`}
                year={
                  (content.release_date ?? content.first_air_date).slice(
                    0,
                    4
                  ) ?? "N/A"
                }
                mediaType={content.media_type as "movie" | "tv"}
                advisoryRating={content.adult ? "18+" : "PG"}
                mediaId={content.id}
              />
            ))}
        </div>
      </div>
      <div className={styles.recommendedContainer}>
        <h2>Recommended for you</h2>
        <div className={styles.recommendedGrid}>
          {recommendedData &&
            recommendedData.map((content, index) => (
              <RegularContentCard
                key={index}
                title={content.title || content.name}
                imgUrl={`https://image.tmdb.org/t/p/w780${content.poster_path}`}
                year={
                  (content.release_date ?? content.first_air_date).slice(
                    0,
                    4
                  ) ?? "N/A"
                }
                mediaType={content.media_type as "movie" | "tv"}
                advisoryRating={content.adult ? "18+" : "PG"}
                mediaId={content.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
