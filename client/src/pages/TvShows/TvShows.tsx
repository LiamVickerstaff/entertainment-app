import styles from "./TvShows.module.css";
import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";

import { useEffect, useState } from "react";
import { fetchTrendingTvShows } from "../../api/tmdbFetches";
import type { TvDataType } from "../../types/mediaDataTypes";

export default function TvShows({ title }: { title: string }) {
  const [tvShowData, setTvShowData] = useState<TvDataType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchTrendingTvShows();
        setTvShowData(data);
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

  useEffect(() => {
    console.log(tvShowData);
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
          tvShowData.map((tvShow, index) => (
            <RegularContentCard
              key={index}
              title={tvShow.name}
              imgUrl={`https://image.tmdb.org/t/p/w780${tvShow.poster_path}`}
              year={tvShow.first_air_date.slice(0, 4)}
              contentType={tvShow.media_type as "movie" | "TV Series"}
              advisoryRating={tvShow.adult ? "18+" : "PG"}
            />
          ))}
      </div>
    </div>
  );
}
