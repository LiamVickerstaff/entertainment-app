import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";
import TrendingContentCard from "../../components/ContentDisplayCards/TrendingContentCard/TrendingContentCard";
import styles from "./Home.module.css";

import { mockData } from "../../../mockData";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.trendingContainer}>
        <h2>Trending</h2>
        <div className={styles.carousel}>
          {mockData.map((content, index) => (
            <TrendingContentCard
              key={index}
              imgUrl={content.imgUrl}
              year={content.year}
              contentType={content.contentType as "Movies" | "TV Series"}
              advisoryRating={content.advisoryRating}
            />
          ))}
        </div>
      </div>
      <div className={styles.recommendedContainer}>
        <h2>Recommended for you</h2>
        <div className={styles.recommendedGrid}>
          {mockData.map((content, index) => (
            <RegularContentCard
              key={index}
              imgUrl={content.imgUrl}
              year={content.year}
              contentType={content.contentType as "Movies" | "TV Series"}
              advisoryRating={content.advisoryRating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
