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
        title,
        mediaType,
        adult,
        posterPath,
        releaseDate,
      };

      const response = (await addBookmarkFetch(newBookmark)) as {
        message: string;
        bookmark: MediaContentType;
      };

      // Update stores
      addBookmark(response.bookmark);
      console.log("added bookmark");
    } catch (error) {
      handleNotAuthorized(error, navigate);
    }
  };

  const handleRemoveBookmark = async (mediaType: "movie" | "tv") => {
    console.log(mediaType);
    console.log("trying to remove bookmark from hook");
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
