import { useLocation } from "react-router-dom";
import {
  fetchRecommendedMedia,
  fetchTrendingMedia,
  fetchTrendingMovies,
  fetchTrendingTvShows,
} from "../api/tmdbFetches";
import { useBookmarksStore } from "../stores/useBookmarksStore";
import { normalizeContentData } from "../utils/tmbdUtils";
import { useCallback, useState } from "react";
import type { MediaContentType } from "../types/mediaDataTypes";

export function useLoadContent() {
  const location = useLocation();
  const { movieBookmarks, tvBookmarks } = useBookmarksStore();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadContent = useCallback(
    async (
      contentType: "trending" | "recommended" | "movie" | "tv",
      setter: (data: MediaContentType[]) => void
    ) => {
      try {
        setLoading(true);

        const isOnBookmarksPage = location.pathname === "/bookmarks";

        if (isOnBookmarksPage) {
          if (contentType === "movie") {
            setter(movieBookmarks.filter((b) => b.mediaType === contentType));
          } else if (contentType === "tv") {
            setter(tvBookmarks.filter((b) => b.mediaType === contentType));
          }
          return;
        }

        let responseData;

        switch (contentType) {
          case "trending":
            responseData = await fetchTrendingMedia();
            break;
          case "recommended":
            responseData = await fetchRecommendedMedia();
            break;
          case "movie":
            responseData = await fetchTrendingMovies();
            break;
          case "tv":
            responseData = await fetchTrendingTvShows();
            break;
        }

        setter(normalizeContentData(responseData));
      } catch (err) {
        setError(
          (err as Error).message ||
            `Whoops! We can't find any ${contentType} content right now`
        );
      } finally {
        setLoading(false);
      }
    },
    [location.pathname, movieBookmarks, tvBookmarks]
  );

  return {
    error,
    loading,
    loadContent,
  };
}
