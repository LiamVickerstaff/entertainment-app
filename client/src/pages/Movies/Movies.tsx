import styles from "./Movies.module.css";
import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";

import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/tmdbFetches";
import { type MediaData } from "../../types/mediaDataTypes";
import { useLocation } from "react-router-dom";
import { useBookmarksStore } from "../../stores/useBookmarksStore";
import { normalizeContentData } from "../../utils/tmbdUtils";

export default function Movies({ title }: { title: string }) {
  const location = useLocation();
  const { bookmarks } = useBookmarksStore();

  const [movieData, setMovieData] = useState<MediaData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const isOnBookmarksPage = location.pathname === "/bookmarks";
        if (isOnBookmarksPage) {
          setMovieData(bookmarks.filter((b) => b.mediaType === "movie"));
        } else {
          const responseData = await fetchTrendingMovies();
          setMovieData(normalizeContentData(responseData));
        }
      } catch (err) {
        const errorMessage =
          (err as Error).message ||
          "Whoops! We can't find any movies right now";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [bookmarks, location]);

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
