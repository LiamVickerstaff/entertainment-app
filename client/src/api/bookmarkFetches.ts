import type { Bookmark } from "../stores/useBookmarksStore";
import { apiFetchWrapper } from "./fetchWrapper";

export const fetchAllBookmarks = async () => {
  return apiFetchWrapper("/bookmark", {
    method: "GET",
    credentials: "include",
  });
};

export const addBookmarkFetch = async (newBookmark: Bookmark) => {
  return apiFetchWrapper("/bookmark/add", {
    method: "POST",
    body: JSON.stringify({ newBookmark }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const removeBookmarkFetch = async (externalId: number) => {
  return apiFetchWrapper(`/bookmark/remove/${externalId}`, {
    method: "DELETE",
    credentials: "include",
  });
};
