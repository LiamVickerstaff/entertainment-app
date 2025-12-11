import styles from "./Movies.module.css";
import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";
import { useBookmarksStore } from "../../stores/useBookmarksStore";
import { fetchMoviesBySearch } from "../../api/tmdbFetches";
import { useSearch } from "../../hooks/useSearch";

export default function Movies({ title }: { title: string }) {
  const { movieBookmarks } = useBookmarksStore();

  const {
    data: movieData,
    loading,
    error,
  } = useSearch("movie", fetchMoviesBySearch, movieBookmarks);

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
      <div className={styles.displayCardsContainer}>
        {movieData &&
          movieData.map((content, index) => (
            <RegularContentCard key={index} content={content} />
          ))}
      </div>
      {location.pathname === "/bookmarks" && movieBookmarks.length === 0 && (
        <p>No movie bookmarks! Go checkout your favourite movies</p>
      )}
    </div>
  );
}
