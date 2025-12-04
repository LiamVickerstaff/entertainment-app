import Movies from "../Movies/Movies";
import TvShows from "../TvShows/TvShows";
import styles from "./Bookmarks.module.css";

export default function Bookmarks() {
  return (
    <div className={styles.container}>
      <Movies title="Bookmarked Movies" />
      <TvShows title="Bookmarked TV Series" />
    </div>
  );
}
