import styles from "./TvShows.module.css";
import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";

import { useEffect, useState } from "react";
import type { MediaContentType } from "../../types/mediaDataTypes";
import { useLocation } from "react-router-dom";
import { useBookmarksStore } from "../../stores/useBookmarksStore";
import { useLoadContent } from "../../hooks/useLoadContent";

export default function TvShows({ title }: { title: string }) {
  const location = useLocation();
  const { tvBookmarks } = useBookmarksStore();
  const { loadContent, error, loading } = useLoadContent();

  const [tvShowData, setTvShowData] = useState<MediaContentType[]>([]);

  // For Initial load of movie data
  useEffect(() => {
    console.log("calling loadConent hook in tv page");
    loadContent("tv", setTvShowData);
  }, []);

  // Reloads data if on bookmarks page and removing tvBookmarks
  useEffect(() => {
    if (location.pathname === "/bookmarks") {
      console.log("calling tv loadConent only if on bookmarks page");
      loadContent("tv", setTvShowData);
    }
  }, [tvBookmarks, location.pathname]);

  if (loading)
    return (
      <div className={styles.container}>
        <h2>{title}</h2>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.container}>
        <h2>{title}</h2>
        <p>
          Oops! We can't find any tv shows at the moment. Please try again
          later!
        </p>
      </div>
    );

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.grid}>
        {tvShowData &&
          tvShowData.map((content, index) => (
            <RegularContentCard key={index} content={content} />
          ))}
      </div>
    </div>
  );
}
