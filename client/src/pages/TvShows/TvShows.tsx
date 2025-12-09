import styles from "./TvShows.module.css";
import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";

import { useEffect, useState } from "react";
import { fetchTrendingTvShows } from "../../api/tmdbFetches";
import type { MediaData } from "../../types/mediaDataTypes";
import { useLocation } from "react-router-dom";
import { useBookmarksStore } from "../../stores/useBookmarksStore";
import { normalizeContentData } from "../../utils/tmbdUtils";

export default function TvShows({ title }: { title: string }) {
  const location = useLocation();
  const { bookmarks } = useBookmarksStore();

  const [tvShowData, setTvShowData] = useState<MediaData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTvShows() {
      try {
        const isOnBookmarksPage = location.pathname === "/bookmarks";
        if (isOnBookmarksPage) {
          setTvShowData(bookmarks.filter((b) => b.mediaType === "tv"));
        } else {
          const responseData = await fetchTrendingTvShows();
          setTvShowData(normalizeContentData(responseData));
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

    loadTvShows();
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
            <RegularContentCard
              key={index}
              title={content.title}
              posterPath={content.posterPath}
              releaseDate={content.releaseDate}
              mediaType={content.mediaType}
              adult={content.adult}
              externalId={content.externalId}
            />
          ))}
      </div>
    </div>
  );
}
