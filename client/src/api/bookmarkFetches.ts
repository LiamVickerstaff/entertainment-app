import { apiFetchWrapper } from "./fetchWrapper";

export const getAllBookmarksFetch = async () => {
  return apiFetchWrapper("/bookmark", {
    method: "GET",
    credentials: "include",
  });
};

export const addBookmarkFetch = async (
  mediaId: number,
  mediaType: "movie" | "tv"
) => {
  return apiFetchWrapper("/bookmark/add", {
    method: "POST",
    body: JSON.stringify({ mediaId, mediaType }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const removeBookmarkFetch = async (mediaId: number) => {
  return apiFetchWrapper(`/bookmark/remove/${mediaId}`, {
    method: "DELETE",
    credentials: "include",
  });
};
