import { getCookie } from "../utils/authUtils";
import { apiFetchWrapper } from "./fetchWrapper";

export const attemptLogin = (email: string, password: string) => {
  return apiFetchWrapper("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const attemptSignUp = (email: string, password: string) => {
  return apiFetchWrapper("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const attemptLogout = () => {
  const csrfToken = getCookie("csrf_token");

  return apiFetchWrapper("/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken ?? "",
    },
  });
};
