import { useState } from "react";
import { validateEmail, validateForm } from "../../utils/authUtils";
import styles from "./auth.module.css";

export default function LoginForm() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setHasSubmit(true);

    const errors = validateForm(formValues);
    setFormErrors(errors);

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    console.log("submitting");
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
              placeholder="Email Address"
            />
            {formErrors.email && hasSubmit && <span>{formErrors.email}</span>}
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
              placeholder="Password"
            />
            {formErrors.password && hasSubmit && (
              <span>{formErrors.password}</span>
            )}
          </div>
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
