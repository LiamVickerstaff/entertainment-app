import { useState } from "react";
import { validateEmail, validateForm } from "../../utils/authUtils";
import styles from "./auth.module.css";
import { attemptLogin } from "../../api/authFetches";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import {
  useBookmarksStore,
  type Bookmark,
} from "../../stores/useBookmarksStore";

export default function LoginForm() {
  const { loginUser } = useUserStore();
  const { setBookmarks } = useBookmarksStore();
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setHasSubmit(true);

    const errors = validateForm({
      ...formValues,
      repeatPassword: formValues.password,
    });
    setFormErrors((prev) => ({ ...prev, errors }));
    console.log(errors);

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    try {
      const response = (await attemptLogin(
        formValues.email,
        formValues.password
      )) as LoginFetchRes;
      console.log("User successfully logged in", response);
      loginUser(response.user);
      setBookmarks(response.userBookmarks);
      navigate("/");
    } catch (error: unknown) {
      let errorMessage = "Login failed";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Login Failed: ", error);
      setFormErrors((prev) => ({
        ...prev,
        authError: errorMessage,
      }));
    }
  }

  return (
    <div className={styles.authFormContainer}>
      <form method="POST" onSubmit={handleSubmit} noValidate>
        <h2 className={styles.formTitle}>Login</h2>
        <div className={styles.formFieldsGroup}>
          <div
            className={`${
              formErrors.email && hasSubmit
                ? styles.fieldContainerError
                : styles.fieldContainer
            }`}
          >
            <input
              className={`${styles.emailField} ${styles.formField}`}
              name="email"
              type="email"
              onChange={(e) => handleChange(e)}
              value={formValues.email}
              placeholder="Email Address"
            />
            {formErrors.email && hasSubmit && (
              <span className={styles.errorMessage}>{formErrors.email}</span>
            )}
          </div>
          <div
            className={`${
              formErrors.password && hasSubmit
                ? styles.fieldContainerError
                : styles.fieldContainer
            }`}
          >
            <input
              className={`${styles.passwordField} ${styles.formField}`}
              name="password"
              type="password"
              onChange={(e) => handleChange(e)}
              value={formValues.password}
              placeholder="Password"
            />
            {formErrors.password && hasSubmit && (
              <span className={styles.errorMessage}>{formErrors.password}</span>
            )}
          </div>
          {formErrors.authError && (
            <span className={styles.errorMessage}>{formErrors.authError}</span>
          )}
        </div>
        <button type="submit" className={styles.submitBtn}>
          Login to your account
        </button>
        <p className={styles.supportMessage}>
          Don't have an account?{" "}
          <a href="/signup" className={styles.formRedirect}>
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

export interface LoginFetchRes {
  message: string;
  user: {
    username: string;
    email: string;
    bookmarkIds: number[];
  };
  userBookmarks: Bookmark[];
}
