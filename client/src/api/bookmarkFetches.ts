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
  console.log(
    "csrfToken we are trying to send to /bookmark/add in headers:",
    csrfToken
  );

  return apiFetchWrapper("/bookmark/add", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken ?? "",
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
      "x-csrf-token": csrfToken ?? "",
    },
  });
};
