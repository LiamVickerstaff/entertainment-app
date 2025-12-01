import { useLocation } from "react-router-dom";
import styles from "./Searchbar.module.css";

export default function Searchbar() {
  const location = useLocation();
  const currentPath = location.pathname.slice(1);

  let searchPlaceholder = "";

  switch (currentPath) {
    case "":
      searchPlaceholder = "Search for movies or TV series";
      break;
    case "movies":
      searchPlaceholder = "Search for movies";
      break;
    case "tv":
      searchPlaceholder = "Search for TV series";
      break;
    case "bookmarks":
      searchPlaceholder = "Search for bookmarked shows";
      break;
  }

  return (
    <div className={styles.container}>
      <img src="/search-icon.svg" alt="Search icon" />
      <input type="text" placeholder={searchPlaceholder} />
    </div>
  );
}
