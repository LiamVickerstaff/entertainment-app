import { useState } from "react";
import styles from "./auth.module.css";
import { validateEmail, validateForm } from "../../utils/authUtils";
import { attemptSignUp } from "../../api/authFetches";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
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

  const navigate = useNavigate();

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

    console.log(formErrors);
    setHasSubmit(true);

    const errors = validateForm(formValues);
    setFormErrors((prev) => ({ ...prev, ...errors }));

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    try {
      await attemptSignUp(formValues.email, formValues.password);
      console.log("User successfully logged in");
      navigate("/");
    } catch (error) {
      console.error("SignUp Failed: ", error);
      setFormErrors((prev) => ({
        ...prev,
        authError: "An error occured, please try again",
      }));
    }
  }

  return (
    <div className={styles.authFormContainer}>
      <form method="POST" onSubmit={handleSubmit} noValidate>
        <h2 className={styles.formTitle}>Sign Up</h2>
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
              value={formValues.password}
              placeholder="Password"
            />
            {formErrors.password && hasSubmit && (
              <span>{formErrors.password}</span>
            )}
          </div>
          <div
            className={`${
              formErrors.repeatPassword && hasSubmit
                ? styles.fieldContainerError
                : styles.fieldContainer
            }`}
          >
            <input
              className={`${styles.passwordField} ${styles.formField}`}
              name="repeatPassword"
              type="password"
              onChange={(e) => handleChange(e)}
              value={formValues.repeatPassword}
              placeholder="Repeat Password"
            />
            {formErrors.repeatPassword && hasSubmit && (
              <span>{formErrors.repeatPassword}</span>
            )}
          </div>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Create an account
        </button>
        <p className={styles.supportMessage}>
          Already have an account?{" "}
          <a href="/login" className={styles.formRedirect}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
