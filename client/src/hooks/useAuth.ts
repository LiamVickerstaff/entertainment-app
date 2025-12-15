import { useNavigate } from "react-router-dom";
import { useBookmarksStore } from "../stores/useBookmarksStore";
import { useUserStore } from "../stores/useUserStore";
import { validateEmail, validateForm } from "../utils/authUtils";
import { attemptLogin, attemptSignUp } from "../api/authFetches";
import type { MediaContentType } from "../types/mediaDataTypes";
import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";

export function useAuth() {
  const { loginUser } = useUserStore();
  const { setBookmarks } = useBookmarksStore();
  const { setCSRFToken } = useAuthStore();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    authError: "",
  });

  const [hasSubmit, setHasSubmit] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));

    setFormErrors((prev) => {
      let error = "";
      if (name === "email") {
        if (!value) error = "Can't be empty";
        else if (!validateEmail(value)) error = "Invalid email";
      }

      if (name === "password") {
        if (!value) error = "Can't be empty";
      }

      if (name === "repeatedPassword") {
        if (!value) error = "Can't be empty";
        else if (value !== formValues.password) error = "Passwords don't match";
      }

      return { ...prev, [name]: error };
    });
  }

  // handle submit works for both login and signup forms
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    formType: "login" | "signup"
  ) {
    e.preventDefault();
    setHasSubmit(true);

    const validate = () => {
      // pass extra password to validateForm() for login form
      if (formType === "login") {
        return validateForm({
          ...formValues,
          repeatPassword: formValues.password, // pass in password again to help pass validation
        });
      }
      //   otherwise just do normal validateForm()
      return validateForm(formValues);
    };

    // run validation and add any errors if present to state
    const errors = validate();
    console.log("post-validate():", errors);
    setFormErrors((prev) => ({ ...prev, ...errors, authError: "" }));

    // if errors are present, don't allow form to submit
    if (Object.values(errors).some(Boolean)) return;

    // Create the fetch and store updates function to call later
    async function runAuth() {
      if (formType === "login") {
        const response = (await attemptLogin(
          formValues.email,
          formValues.password
        )) as AuthFetchRes;
        loginUser(response.user);
        setBookmarks(response.userBookmarks!);
        setCSRFToken(response.newCSRFToken);
        return;
      } else {
        const response = (await attemptSignUp(
          formValues.email,
          formValues.password
        )) as AuthFetchRes;
        console.log("New user successfully created");
        loginUser(response.user);
        setBookmarks([]);
        setCSRFToken(response.newCSRFToken);
      }
    }

    // send auth fetch to server and handle response errors
    try {
      await runAuth();
      navigate("/");
    } catch (error) {
      console.error("auth form error:", error);
      let message = "Something went wrong";

      if (error instanceof Error) {
        message = error.message;
      }
      setFormErrors((prev) => ({
        ...prev,
        authError: message,
      }));
    }
  }

  return {
    formValues,
    formErrors,
    hasSubmit,
    handleChange,
    handleSubmit,
  };
}

export interface AuthFetchRes {
  message: string;
  user: {
    username: string;
    email: string;
  };
  userBookmarks?: MediaContentType[];
  newCSRFToken: string;
}
