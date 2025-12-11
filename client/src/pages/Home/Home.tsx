import styles from "./Home.module.css";
import TrendingContentCard from "../../components/ContentDisplayCards/TrendingContentCard/TrendingContentCard";
import { useEffect, useState } from "react";
import type { MediaContentType } from "../../types/mediaDataTypes";
import { useLoadContent } from "../../hooks/useLoadContent";
import { useSearchParams } from "react-router-dom";
import { fetchAllBySearch } from "../../api/tmdbFetches";
import { formatContentData } from "../../utils/tmbdUtils";
import DisplayContentGroup from "../../components/DisplayContentGroup/DisplayContentGroup";

export default function Home() {
  const [searchParams] = useSearchParams();
  const { loadContent, error, loading } = useLoadContent();

  const [trendingData, setTrendingData] = useState<MediaContentType[] | []>([]);
  const [searchData, setSearchData] = useState<MediaContentType[] | []>([]);
  const [recommendedData, setRecommendedData] = useState<
    MediaContentType[] | []
  >([]);

  useEffect(() => {
    loadContent("trending", setTrendingData);
    loadContent("recommended", setRecommendedData);
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get("q");

    (async () => {
      if (!searchQuery) {
        setSearchData([]);
        return;
      }

      try {
        const searchResult = await fetchAllBySearch(searchQuery);
        setSearchData(formatContentData(searchResult));
      } catch (error) {
        console.error(
          "Failed to fetch and set searchData by all search:",
          error
        );
      }
    })();
  }, [searchParams]);

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

  if (searchData && searchData.length > 0) {
    return (
      <div className={styles.homeContainer}>
        <DisplayContentGroup
          title={"Search Results"}
          contentData={searchData}
          loading={loading}
          error={error}
        />
      </div>
    );
  }

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
      <DisplayContentGroup
        title={"Recommended"}
        contentData={recommendedData}
        loading={loading}
        error={error}
      />
    </div>
  );
}
