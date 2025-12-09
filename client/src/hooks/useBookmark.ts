import { useNavigate } from "react-router-dom";
import {
  useBookmarksStore,
  type BookmarkType,
} from "../stores/useBookmarksStore";
import { addBookmarkFetch, removeBookmarkFetch } from "../api/bookmarkFetches";
import { handleNotAuthorized } from "../utils/authUtils";

interface UseBookmarkProps {
  externalId: number;
  title: string;
  mediaType: "movie" | "tv";
  adult: boolean;
  posterPath: string;
  releaseDate: string;
}

export function useBookmark({
  externalId,
  title,
  mediaType,
  adult,
  posterPath,
  releaseDate,
}: UseBookmarkProps) {
  const { bookmarkIds, addBookmark, removeBookmark } = useBookmarksStore();
  const navigate = useNavigate();

  const isBookmarked = bookmarkIds.includes(externalId);

  const handleAddBookmark = async () => {
    try {
      const newBookmark = {
        externalId,
        title,
        mediaType,
        adult,
        posterPath,
        releaseDate,
      };

      const response = (await addBookmarkFetch(newBookmark)) as {
        message: string;
        bookmark: BookmarkType;
      };

      // Update stores
      addBookmark(response.bookmark);
    } catch (error) {
      handleNotAuthorized(error, navigate);
    }
  };

  const handleRemoveBookmark = async () => {
    try {
      const response = (await removeBookmarkFetch(externalId)) as {
        message: string;
        removedBookmarkId: number;
      };

      removeBookmark(response.removedBookmarkId);
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
