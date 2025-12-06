import styles from "./Movies.module.css";
import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";

import { mockData } from "../../../mockData";

export default function Movies({ title }: { title: string }) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.grid}>
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
  );
}
