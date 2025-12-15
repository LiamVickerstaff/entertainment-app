import { create } from "zustand";

interface AuthStore {
  sessionCSRFToken: string;

  setCSRFToken: (newCSRFToken: string) => void;
  resetAuthStore: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  sessionCSRFToken: "",

  setCSRFToken: (newCSRFToken) => set({ sessionCSRFToken: newCSRFToken }),

  resetAuthStore: () => set({ sessionCSRFToken: "" }),
}));
