import { useNavigate } from "react-router-dom";
import { useBookmarksStore } from "../stores/useBookmarksStore";
import { addBookmarkFetch, removeBookmarkFetch } from "../api/bookmarkFetches";
import { handleNotAuthorized } from "../utils/authUtils";
import type { MediaContentType } from "../types/mediaDataTypes";

export function useBookmark({
  externalId,
  title,
  mediaType,
  adult,
  posterPath,
  releaseDate,
}: MediaContentType) {
  const { bookmarkIds, addBookmark, removeBookmark } = useBookmarksStore();
  const navigate = useNavigate();

  const isBookmarked = bookmarkIds.includes(externalId);

  const handleAddBookmark = async () => {
    try {
      const newBookmark = {
        externalId,
        title: title || "N/A",
        mediaType: mediaType || "movie",
        adult,
        posterPath: posterPath || "N/A",
        releaseDate: releaseDate || "N/A",
      };

      const response = (await addBookmarkFetch(newBookmark)) as {
        message: string;
        bookmark: MediaContentType;
      };

      // Update stores
      addBookmark(response.bookmark);
    } catch (error) {
      handleNotAuthorized(error, navigate);
    }
  };

  const handleRemoveBookmark = async (mediaType: "movie" | "tv") => {
    try {
      const response = (await removeBookmarkFetch(externalId)) as {
        message: string;
        removedBookmarkId: number;
      };

      removeBookmark(response.removedBookmarkId, mediaType);
    } catch (error) {
      handleNotAuthorized(error, navigate);
    }
  };

  return {
    isBookmarked,
    handleAddBookmark,
    handleRemoveBookmark,
  };
}
