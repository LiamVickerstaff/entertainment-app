import styles from "./Movies.module.css";
import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";

import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/tmdbFetches";
import type { MovieDataType } from "../../types/mediaDataTypes";

export default function Movies({ title }: { title: string }) {
  const [movieData, setMovieData] = useState<MovieDataType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchTrendingMovies();
        setMovieData(data);
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
  }, []);

  // useEffect(() => {
  //   console.log(movieData);
  // }, [movieData]);

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
          movieData.map((movie, index) => (
            <RegularContentCard
              key={index}
              title={movie.title}
              imgUrl={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              year={movie.release_date.slice(0, 4)}
              contentType={movie.media_type as "movie" | "TV Series"}
              advisoryRating={movie.adult ? "18+" : "PG"}
              mediaId={movie.id}
            />
          ))}
      </div>
    </div>
  );
}
