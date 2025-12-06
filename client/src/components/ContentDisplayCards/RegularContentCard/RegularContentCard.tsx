import { useState } from "react";
import styles from "./RegularContentCard.module.css";
import type { ContentCardProps } from "../TrendingContentCard/TrendingContentCard";

export default function RegularContentCard({
  imgUrl,
  year,
  contentType,
  advisoryRating,
}: ContentCardProps) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  function handleToggleBookmark() {
    setIsBookmarked((prev) => !prev);
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.contentImageDisplay}`}
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        <button className={styles.hoverPlayBackdrop}>
          <div className={styles.playbutton}>
            <svg viewBox="0 0 30 30">
              <path d="M0 15C0 6.7125 6.7125 0 15 0C23.2875 0 30 6.7125 30 15C30 23.2875 23.2875 30 15 30C6.7125 30 0 23.2875 0 15ZM21 14.5L12 8V21L21 14.5Z" />
            </svg>
            <p>Play</p>
          </div>
        </button>
        <button
          className={`${styles.bookmarkBtn} ${
            isBookmarked ? styles.isBookmarked : ""
          }`}
          onClick={handleToggleBookmark}
        >
          <svg
            viewBox="0 0 12 14"
            className={`${styles.bookmarkIcon} ${
              isBookmarked ? styles.isBookmarked : ""
            }`}
          >
            <path
              d="M1.05762 0.75H10.6094C10.6466 0.75 10.6782 0.757236 10.7109 0.771484L10.7217 0.775391L10.7314 0.779297C10.7986 0.80616 10.8383 0.840443 10.8701 0.886719C10.9028 0.934312 10.917 0.977751 10.917 1.03613V12.9639C10.917 13.0222 10.9028 13.0657 10.8701 13.1133C10.8383 13.1596 10.7986 13.1938 10.7314 13.2207L10.7236 13.2236L10.7158 13.2275C10.7109 13.2296 10.6807 13.2412 10.6094 13.2412C10.5318 13.2412 10.4733 13.225 10.418 13.1885L10.3633 13.1445L6.35742 9.23438L5.83301 8.72363L5.30957 9.23438L1.30273 13.1455C1.21581 13.2264 1.14401 13.2499 1.05762 13.25C1.02036 13.25 0.987856 13.2428 0.955078 13.2285L0.945312 13.2246L0.93457 13.2207L0.852539 13.1738C0.830239 13.1562 0.811855 13.1365 0.795898 13.1133C0.76325 13.0657 0.750034 13.0222 0.75 12.9639V1.03613C0.750034 0.977751 0.76325 0.934311 0.795898 0.886719C0.827746 0.840293 0.867275 0.806216 0.93457 0.779297L0.945312 0.775391L0.955078 0.771484C0.987856 0.757223 1.02036 0.75 1.05762 0.75Z"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
      <div className={styles.contentInfoSection}>
        <div className={styles.contentMetadataGroup}>
          <span>{year}</span>
          <span>&bull;</span>

          <span className={styles.contentType}>
            {contentType === "TV Series" ? (
              <svg viewBox="0 0 10 10">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.54 2.24054H10V10H0V2.24054H2.46L1.11 0.601358L1.89 0.014549L3.5 1.95441L5.11 0L5.89 0.601358L4.54 2.24054ZM1 3.21048V9.03007H6V3.21048H1ZM8.5 7.0902H7.5V6.12027H8.5V7.0902ZM7.5 5.15034H8.5V4.18041H7.5V5.15034Z"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 10 10">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.47778 0H1.52222C0.681522 0 0 0.681522 0 1.52222V8.47778C0 9.31848 0.681522 10 1.52222 10H8.47778C8.8815 10 9.26868 9.83962 9.55415 9.55415C9.83962 9.26868 10 8.8815 10 8.47778V1.52222C10 1.1185 9.83962 0.731321 9.55415 0.445849C9.26868 0.160377 8.8815 0 8.47778 0ZM2 4.5H1V3.5H2V4.5ZM2 5.5H1V6.5H2V5.5ZM9 4.5H8V3.5H9V4.5ZM9 5.5H8V6.5H9V5.5ZM9 1.37V2H8V1H8.63C8.72813 1 8.82224 1.03898 8.89163 1.10837C8.96102 1.17776 9 1.27187 9 1.37ZM2 1H1.37C1.27187 1 1.17776 1.03898 1.10837 1.10837C1.03898 1.17776 1 1.27187 1 1.37V2H2V1ZM1 8.63V8H2V9H1.37C1.27187 9 1.17776 8.96102 1.10837 8.89163C1.03898 8.82224 1 8.72813 1 8.63ZM8.63 9C8.83435 9 9 8.83435 9 8.63V8H8V9H8.63Z"
                />
              </svg>
            )}
            {contentType}
          </span>
          <span>&bull;</span>
          <span>{advisoryRating}</span>
        </div>
        <p className={styles.contentTitle}>Content Title</p>
      </div>
    </div>
  );
}
