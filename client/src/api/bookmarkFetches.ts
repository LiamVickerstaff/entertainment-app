import type { MediaContentType } from "../types/mediaDataTypes";
import { apiFetchWrapper } from "./fetchWrapper";

export const addBookmarkFetch = async (
  newBookmark: MediaContentType,
  sessionCSRFToken: string
) => {
  return apiFetchWrapper("/bookmark/add", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-token": sessionCSRFToken ?? "",
    },
    body: JSON.stringify({ newBookmark }),
  });
};

export const removeBookmarkFetch = async (
  externalId: number,
  sessionCSRFToken: string
) => {
  return apiFetchWrapper(`/bookmark/remove/${externalId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-token": sessionCSRFToken ?? "",
    },
  });
};
