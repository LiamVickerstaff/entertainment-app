import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const location = useLocation();

  const currentPath = location.pathname.slice(1);

  return (
    <nav className={styles.navbar}>
      <img
        className={styles.appIcon}
        src="/entertainment-web-app-favicon.svg"
        alt="entertainment app logo"
      />
      <ul className={styles.linksGroup}>
        <li>
          <Link to={"/"}>
            <img
              className={`${styles.icon} ${
                currentPath === "" ? "" : styles.inactiveLink
              } `}
              src="/home-navbar-icon.svg"
              alt="home page link"
            />
          </Link>
        </li>
        <li>
          <Link to={"/movies"}>
            <img
              className={`${styles.icon} ${
                currentPath === "movies" ? "" : styles.inactiveLink
              } `}
              src="/movies-navbar-icon.svg"
              alt="movies page link"
            />
          </Link>
        </li>
        <li>
          <Link to={"/tv"}>
            <img
              className={`${styles.icon} ${
                currentPath === "tv" ? "" : styles.inactiveLink
              } `}
              src="/tv-navbar-icon.svg"
              alt="tv page link"
            />
          </Link>
        </li>
        <li>
          <Link to={"/bookmarks"}>
            <img
              className={`${styles.icon} ${
                currentPath === "bookmarks" ? "" : styles.inactiveLink
              } `}
              src="/bookmarks-navbar-icon.svg"
              alt="bookmarks page link"
            />
          </Link>
        </li>
      </ul>
      <button className={styles.avatar}>
        <img src="/entertainment-web-app-favicon.svg" alt="avatar" />
      </button>
    </nav>
  );
}
