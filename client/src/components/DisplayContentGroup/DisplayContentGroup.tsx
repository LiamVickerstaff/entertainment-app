import { Link, useSearchParams } from "react-router-dom";
import type { MediaContentType } from "../../types/mediaDataTypes";
import RegularContentCard from "../ContentDisplayCards/RegularContentCard/RegularContentCard";
import styles from "./DisplayContentGroup.module.css";

export default function DisplayContentGroup({
  title,
  contentData,
  loading,
  error,
}: {
  title: string;
  contentData: MediaContentType[];
  loading: boolean;
  error: string | null;
}) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() ?? "";

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
        {contentData &&
          contentData.map((content, index) => (
            <RegularContentCard key={index} content={content} />
          ))}
      </div>
      {location.pathname === "/bookmarks" && contentData.length === 0 && (
        <p className={styles.missingContentMessage}>
          Looks like you don't any bookmarks! Go checkout them out{" "}
          <Link to={"/"}>here</Link>
        </p>
      )}
      {location.pathname !== "/bookmarks" && contentData.length === 0 && (
        <p className={styles.missingContentMessage}>
          We couldn't find anything for: "{searchQuery}"
        </p>
      )}
    </div>
  );
}
