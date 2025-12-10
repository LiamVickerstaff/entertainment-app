import type { MediaContentType } from "../types/mediaDataTypes";
import { getCookie } from "../utils/authUtils";
import { apiFetchWrapper } from "./fetchWrapper";

export const fetchAllBookmarks = async () => {
  return apiFetchWrapper("/bookmark", {
    method: "GET",
    credentials: "include",
  });
};

export const addBookmarkFetch = async (newBookmark: MediaContentType) => {
  const csrfToken = getCookie("csrf_token");

  return apiFetchWrapper("/bookmark/add", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken ?? "",
    },
    body: JSON.stringify({ newBookmark }),
  });
};

export const removeBookmarkFetch = async (externalId: number) => {
  const csrfToken = getCookie("csrf_token");

  return apiFetchWrapper(`/bookmark/remove/${externalId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken ?? "",
    },
  });
};
