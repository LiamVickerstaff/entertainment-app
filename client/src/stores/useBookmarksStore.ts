import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BookmarkType {
  externalId: number;
  title: string;
  mediaType: "movie" | "tv";
  adult: boolean;
  posterPath: string;
  releaseDate: string;
}

interface BookmarkStore {
  // Store states / setters
  bookmarks: BookmarkType[];
  bookmarkIds: number[];
  setBookmarks: (bookmarks: BookmarkType[]) => void;
  addBookmark: (newBookmark: BookmarkType) => void;
  removeBookmark: (bookmarkId: number) => void;
  resetBookmarksStore: () => void;
}

export const useBookmarksStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      bookmarkIds: [],

      setBookmarks: (bookmarks) => {
        const bookmarkIds = bookmarks.map((b) => b.externalId);
        set({ bookmarks, bookmarkIds: bookmarkIds });
      },

      addBookmark: (newBookmark) => {
        set({
          bookmarks: [...get().bookmarks, newBookmark],
          bookmarkIds: [...get().bookmarkIds, newBookmark.externalId],
        });
      },

      removeBookmark: (bookmarkId) => {
        set({
          bookmarks: get().bookmarks.filter((b) => b.externalId !== bookmarkId),
          bookmarkIds: get().bookmarkIds.filter((id) => id !== bookmarkId),
        });
      },

      resetBookmarksStore: () => {
        set({
          bookmarks: [],
          bookmarkIds: [],
        });
      },
    }),
    {
      name: "bookmarks-storage",
    }
  )
);
