import styles from "./TvShows.module.css";
import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";
import { useBookmarksStore } from "../../stores/useBookmarksStore";
import { fetchTvBySearch } from "../../api/tmdbFetches";
import { useSearch } from "../../hooks/useSearch";
import { useEffect } from "react";

export default function TvShows({ title }: { title: string }) {
  const { tvBookmarks } = useBookmarksStore();

  const {
    data: tvShowData,
    loading,
    error,
  } = useSearch("tv", fetchTvBySearch, tvBookmarks);

  useEffect(() => {
    console.log("data inside tvShows component", tvShowData);
  }, [tvShowData]);

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
      {location.pathname === "/bookmarks" && tvBookmarks.length === 0 && (
        <p>No movie bookmarks! Go checkout your favourite movies</p>
      )}
    </div>
  );
}
