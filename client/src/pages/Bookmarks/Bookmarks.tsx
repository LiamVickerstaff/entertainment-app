import { useEffect } from "react";
import Movies from "../Movies/Movies";
import TvShows from "../TvShows/TvShows";
import styles from "./Bookmarks.module.css";

export default function Bookmarks() {

  useEffect(() => {
    console.log("trying authentication")
  }, [])

  return (
    <div className={styles.container}>
      <Movies title="Bookmarked Movies" />
      <TvShows title="Bookmarked TV Series" />
    </div>
  );
}
