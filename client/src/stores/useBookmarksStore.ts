import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MediaContentType } from "../types/mediaDataTypes";

interface BookmarkStore {
  // Store states / setters
  movieBookmarks: MediaContentType[];
  tvBookmarks: MediaContentType[];
  bookmarkIds: number[];
  setBookmarks: (bookmarks: MediaContentType[]) => void;
  addBookmark: (newBookmark: MediaContentType) => void;
  removeBookmark: (bookmarkId: number, mediaType: "movie" | "tv") => void;
  resetBookmarksStore: () => void;
}

export const useBookmarksStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      movieBookmarks: [],
      tvBookmarks: [],
      bookmarkIds: [],

      setBookmarks: (bookmarks) => {
        const bookmarkIds = bookmarks.map((b) => b.externalId);
        const movieBookmarks = bookmarks.filter((b) => b.mediaType === "movie");
        const tvBookmarks = bookmarks.filter((b) => b.mediaType === "tv");

        set({ movieBookmarks, tvBookmarks, bookmarkIds: bookmarkIds });
      },

      addBookmark: (newBookmark) => {
        if (newBookmark.mediaType === "movie") {
          set({
            movieBookmarks: [...get().movieBookmarks, newBookmark],
            bookmarkIds: [...get().bookmarkIds, newBookmark.externalId],
          });
        } else {
          set({
            tvBookmarks: [...get().tvBookmarks, newBookmark],
            bookmarkIds: [...get().bookmarkIds, newBookmark.externalId],
          });
        }
      },

      removeBookmark: (bookmarkId, mediaType) => {
        if (mediaType === "movie") {
          set({
            movieBookmarks: get().movieBookmarks.filter(
              (b) => b.externalId !== bookmarkId
            ),
            bookmarkIds: get().bookmarkIds.filter((id) => id !== bookmarkId),
          });
        } else {
          set({
            tvBookmarks: get().tvBookmarks.filter(
              (b) => b.externalId !== bookmarkId
            ),
            bookmarkIds: get().bookmarkIds.filter((id) => id !== bookmarkId),
          });
        }
      },

      resetBookmarksStore: () => {
        set({
          movieBookmarks: [],
          tvBookmarks: [],
          bookmarkIds: [],
        });
      },
    }),
    {
      name: "bookmarks-storage",
    }
  )
);
