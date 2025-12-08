import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  username: string;
  email: string;
  bookmarkIds: number[];

  loginUser: (userPaylod: {
    username: string;
    email: string;
    bookmarkIds: number[];
  }) => void;
  logoutUser: () => void;

  addBookmarkIdToStore: (bookmarkId: number) => void;
  removeBookmarkIdFromStore: (bookmarkId: number) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      username: "",
      email: "",
      bookmarkIds: [],

      loginUser: (userPaylod) => {
        set(() => ({
          username: userPaylod.username,
          email: userPaylod.email,
          bookmarkIds: userPaylod.bookmarkIds || [],
        }));
      },

      logoutUser: () => {
        set(() => ({
          username: "",
          email: "",
          bookmarkIds: [],
        }));

        useUserStore.persist.clearStorage();
      },

      addBookmarkIdToStore: (bookmarkId) => {
        set((state) => ({
          bookmarkIds: [...state.bookmarkIds, bookmarkId],
        }));
      },

      removeBookmarkIdFromStore: (bookmarkId) => {
        set((state) => ({
          bookmarkIds: state.bookmarkIds.filter((id) => id !== bookmarkId),
        }));
      },
    }),
    { name: "user-details-storage" }
  )
);
