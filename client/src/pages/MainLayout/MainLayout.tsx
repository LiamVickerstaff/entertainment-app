import { Outlet, useLocation } from "react-router-dom";
import styles from "./MainLayout.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar/Searchbar";
export default function MainLayout() {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <Navbar />

      <main>
        <Searchbar key={location.pathname} />
        <Outlet />
      </main>
    </div>
  );
}
