import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import MainLayout from "./pages/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import TvShows from "./pages/TvShows/TvShows";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import { useEffect } from "react";
import { getFreshCSRFToken } from "./api/authFetches";
import { useUserStore } from "./stores/useUserStore";
import { useAuthStore } from "./stores/useAuthStore";

function App() {
  const { setCSRFToken } = useAuthStore();
  const { isLoggedIn } = useUserStore();
  // On each page relaod, refresh the csrf token
  useEffect(() => {
    // Only ever refresh the csrf token when a user is already logged in
    console.log("page reloaded");

    const runCSRFRefresh = async () => {
      if (isLoggedIn) {
        console.log(
          "Trying to refresh csrf token after page reload and user is logged in"
        );
        try {
          const { newCSRFToken } = (await getFreshCSRFToken()) as {
            newCSRFToken: string;
          };
          setCSRFToken(newCSRFToken);
        } catch (error) {
          console.log("error from getFreshCSRFToken", error);
        }
      }
    };

    runCSRFRefresh();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies title="Movies" />} />
          <Route path="/tv" element={<TvShows title="TV Series" />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
