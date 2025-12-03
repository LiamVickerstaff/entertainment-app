import TrendingContentCard from "../../components/ContentDisplayCards/TrendingContentCard/TrendingContentCard";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.trendingContainer}>
        <h2>Trending</h2>
        <div className={styles.carousel}>
          <TrendingContentCard />
          <TrendingContentCard />
          <TrendingContentCard />
          <TrendingContentCard />
        </div>
      </div>
      <div className={styles.recommendedContainer}>
        <h2>Recommended for you</h2>
        <p>content grid</p>
      </div>
    </div>
  );
}
