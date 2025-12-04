import styles from "./Movies.module.css";
import RegularContentCard from "../../components/ContentDisplayCards/RegularContentCard/RegularContentCard";

export default function Movies({ title }: { title: string }) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.grid}>
        <RegularContentCard />
        <RegularContentCard />
        <RegularContentCard />
        <RegularContentCard />
        <RegularContentCard />
        <RegularContentCard />
        <RegularContentCard />
        <RegularContentCard />
        <RegularContentCard />
        <RegularContentCard />
      </div>
    </div>
  );
}
