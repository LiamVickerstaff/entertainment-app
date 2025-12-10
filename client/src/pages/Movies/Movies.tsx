import styles from "./Movies.module.css";
import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";

import { useEffect, useState } from "react";
import { type MediaContentType } from "../../types/mediaDataTypes";
import { useLocation } from "react-router-dom";
import { useBookmarksStore } from "../../stores/useBookmarksStore";
import { useLoadContent } from "../../hooks/useLoadContent";

export default function Movies({ title }: { title: string }) {
  const location = useLocation();
  const { movieBookmarks } = useBookmarksStore();
  const { loadContent, error, loading } = useLoadContent();

  const [movieData, setMovieData] = useState<MediaContentType[]>([]);

  // For Initial load of movie data
  useEffect(() => {
    console.log("calling loadConent hook in movies page");
    loadContent("movie", setMovieData);
  }, []);

  // Reloads data if on bookmarks page and removing movieBookmarks
  useEffect(() => {
    if (location.pathname === "/bookmarks") {
      console.log("calling movies loadConent only if on bookmarks page");
      loadContent("movie", setMovieData);
    }
  }, [movieBookmarks, location.pathname]);

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
          Oops! We can't find any movies at the moment. Please try again later!
        </p>
      </div>
    );

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.grid}>
        {movieData &&
          movieData.map((content, index) => (
            <RegularContentCard key={index} content={content} />
          ))}
      </div>
    </div>
  );
}
