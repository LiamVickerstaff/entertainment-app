import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useBookmarksStore } from "./useBookmarksStore";
import { useAuthStore } from "./useAuthStore";

interface userDetailsType {
  username: string;
  email: string;
}

interface UserStore {
  username: string;
  email: string;
  isLoggedIn: boolean;

  loginUser: (userPaylod: userDetailsType) => void;
  logoutUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      username: "",
      email: "",
      isLoggedIn: false,

      loginUser: (userPaylod) => {
        set(() => ({
          username: userPaylod.username,
          email: userPaylod.email,
          isLoggedIn: true,
        }));
      },

      logoutUser: () => {
        // Reset store values
        set(() => ({
          username: "",
          email: "",
          isLoggedIn: false,
        }));

        // delete user-details-storage from client local storage
        useUserStore.persist.clearStorage();

        // Clear and delete bookmark storage from local storage
        useBookmarksStore.getState().resetBookmarksStore();
        useBookmarksStore.persist.clearStorage();

        useAuthStore.getState().resetAuthStore();
      },
    }),
    { name: "user-details-storage" }
  )
);
