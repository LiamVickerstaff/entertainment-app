import styles from "./Home.module.css";
import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";
import TrendingContentCard from "../../components/ContentDisplayCards/TrendingContentCard/TrendingContentCard";
import { useEffect, useState } from "react";
import type { MediaContentType } from "../../types/mediaDataTypes";
import { useLoadContent } from "../../hooks/useLoadContent";

export default function Home() {
  const [trendingData, setTrendingData] = useState<MediaContentType[] | []>([]);
  const [recommendedData, setRecommendedData] = useState<
    MediaContentType[] | []
  >([]);

  const { loadContent, error, loading } = useLoadContent();

  useEffect(() => {
    loadContent("trending", setTrendingData);
    loadContent("recommended", setRecommendedData);
  }, []); // not including loadContent dependency since each call re-creates the function so
  // it thinks that should re-render infinetely

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
