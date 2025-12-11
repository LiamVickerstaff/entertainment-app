import { useLocation, useSearchParams } from "react-router-dom";
import styles from "./Searchbar.module.css";
import { useEffect, useState } from "react";

export default function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const currentPath = location.pathname.slice(1);

  const [input, setInput] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams(input ? { q: input } : {});
    }, 1000);

    return () => clearTimeout(handler);
  }, [input, setSearchParams]);

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
      searchPlaceholder = "Search for bookmarks";
      break;
  }

  return (
    <div className={styles.container}>
      <img src="/search-icon.svg" alt="Search icon" />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={searchPlaceholder}
      />
    </div>
  );
}
