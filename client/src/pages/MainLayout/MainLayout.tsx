import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar/Searchbar";
export default function MainLayout() {

  return (
    <div className={styles.container}>
      <Navbar/>

      <main>
        <Searchbar />
        <Outlet />
      </main>
    </div>
  );
}
