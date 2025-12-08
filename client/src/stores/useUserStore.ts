import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  username: string;
  email: string;

  loginUser: (userPaylod: { username: string; email: string }) => void;
  logoutUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      username: "",
      email: "",

      loginUser: (userPaylod) => {
        set(() => ({
          username: userPaylod.username,
          email: userPaylod.email,
        }));
      },

      logoutUser: () => {
        set(() => ({
          username: "",
          email: "",
        }));

        useUserStore.persist.clearStorage();
      },
    }),
    { name: "user-details-storage" }
  )
);
