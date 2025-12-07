import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useEffect, useRef, useState } from "react";
import UserModal from "../UserModal/UserModal";

export default function Navbar() {
  const location = useLocation();

  const currentPath = location.pathname.slice(1);

  const [userModalIsOpen, setUserModalIsOpen] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleOpenModal() {
    setUserModalIsOpen(true);
  }
  function handleCloseModal() {
    setUserModalIsOpen(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (userModalIsOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [userModalIsOpen]);

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
            <svg
              viewBox="0 0 20 20"
              className={`${styles.icon} ${
                currentPath === "" ? styles.activeLink : ""
              } `}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 0H8C8.6 0 9 0.4 9 1V8C9 8.6 8.6 9 8 9H1C0.4 9 0 8.6 0 8V1C0 0.4 0.4 0 1 0ZM1 11H8C8.6 11 9 11.4 9 12V19C9 19.6 8.6 20 8 20H1C0.4 20 0 19.6 0 19V12C0 11.4 0.4 11 1 11ZM19 0H12C11.4 0 11 0.4 11 1V8C11 8.6 11.4 9 12 9H19C19.6 9 20 8.6 20 8V1C20 0.4 19.6 0 19 0ZM12 11H19C19.6 11 20 11.4 20 12V19C20 19.6 19.6 20 19 20H12C11.4 20 11 19.6 11 19V12C11 11.4 11.4 11 12 11Z"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link to={"/movies"}>
            <svg
              viewBox="0 0 16 16"
              className={`${styles.icon} ${
                currentPath === "movies" ? styles.activeLink : ""
              } `}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5644 0H2.43556C1.09044 0 0 1.09044 0 2.43556V13.5644C0 14.9096 1.09044 16 2.43556 16H13.5644C14.2104 16 14.8299 15.7434 15.2866 15.2866C15.7434 14.8299 16 14.2104 16 13.5644V2.43556C16 1.78961 15.7434 1.17011 15.2866 0.713358C14.8299 0.256602 14.2104 0 13.5644 0ZM3.2 7.2H1.6V5.6H3.2V7.2ZM3.2 8.8H1.6V10.4H3.2V8.8ZM14.4 7.2H12.8V5.6H14.4V7.2ZM14.4 8.8H12.8V10.4H14.4V8.8ZM14.4 2.192V3.2H12.8V1.6H13.808C13.965 1.6 14.1156 1.66237 14.2266 1.77339C14.3376 1.88441 14.4 2.03499 14.4 2.192ZM3.2 1.6H2.192C2.03499 1.6 1.88441 1.66237 1.77339 1.77339C1.66237 1.88441 1.6 2.03499 1.6 2.192V3.2H3.2V1.6ZM1.6 13.808V12.8H3.2V14.4H2.192C2.03499 14.4 1.88441 14.3376 1.77339 14.2266C1.66237 14.1156 1.6 13.965 1.6 13.808ZM12.8 14.4H13.808C14.135 14.4 14.4 14.135 14.4 13.808V12.8H12.8V14.4Z"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link to={"/tv"}>
            <svg
              viewBox="0 0 20 20"
              className={`${styles.icon} ${
                currentPath === "tv" ? styles.activeLink : ""
              } `}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.08 4.48109H20V20H0V4.48109H4.92L2.22 1.20272L3.78 0.029098L7 3.90883L10.22 0L11.78 1.20272L9.08 4.48109ZM2 6.42095V18.0601H12V6.42095H2ZM17 14.1804H15V12.2405H17V14.1804ZM15 10.3007H17V8.36082H15V10.3007Z"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link to={"/bookmarks"}>
            <svg
              viewBox="0 0 17 20"
              className={`${styles.icon} ${
                currentPath === "bookmarks" ? styles.activeLink : ""
              } `}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.3866 0C15.5893 0 15.7832 0.0396563 15.9683 0.118969C16.2591 0.233532 16.4904 0.414188 16.6623 0.660939C16.8341 0.907689 16.92 1.18088 16.92 1.4805V18.5195C16.92 18.8191 16.8341 19.0923 16.6623 19.3391C16.4904 19.5858 16.2591 19.7665 15.9683 19.881C15.8008 19.9515 15.607 19.9868 15.3866 19.9868C14.9636 19.9868 14.5979 19.8458 14.2895 19.5638L8.46001 13.959L2.63054 19.5638C2.31328 19.8546 1.94757 20 1.53338 20C1.33069 20 1.13681 19.9603 0.951751 19.881C0.660939 19.7665 0.42961 19.5858 0.257766 19.3391C0.085922 19.0923 0 18.8191 0 18.5195V1.4805C0 1.18088 0.085922 0.907689 0.257766 0.660939C0.42961 0.414188 0.660939 0.233532 0.951751 0.118969C1.13681 0.0396563 1.33069 0 1.53338 0H15.3866Z"
              />
            </svg>
          </Link>
        </li>
      </ul>
      <button className={styles.avatar} onClick={handleOpenModal}>
        <img src="/entertainment-web-app-favicon.svg" alt="avatar" />
      </button>
      {userModalIsOpen && (
        <UserModal dialogRef={dialogRef} handleCloseModal={handleCloseModal} />
      )}
    </nav>
  );
}
