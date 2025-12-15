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

export const attemptLogout = (sessionCSRFToken: string) => {
  return apiFetchWrapper("/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-token": sessionCSRFToken ?? "",
    },
  });
};

export const getFreshCSRFToken = () => {
  return apiFetchWrapper("/auth/fresh-csrf", {
    method: "GET",
    credentials: "include",
  });
};
