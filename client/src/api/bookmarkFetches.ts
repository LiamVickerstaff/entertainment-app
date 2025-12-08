import { apiFetchWrapper } from "./fetchWrapper";

export const addBookmarkFetch = async (mediaId: number) => {
  return apiFetchWrapper("/bookmark/add", {
    method: "POST",
    body: JSON.stringify({ mediaId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};
