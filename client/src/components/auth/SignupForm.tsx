import styles from "./auth.module.css";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

export default function SignupForm() {
  const location = useLocation();
  const redirectedFromAuth = location.state?.fromAuth === true;

  const { formValues, formErrors, hasSubmit, handleChange, handleSubmit } =
    useAuth();

  useEffect(() => {
    console.log("FormErrors:", formErrors);
  }, [formErrors]);

  return (
    <div className={styles.topContainer}>
      <div className={styles.innerContainer}>
        <h1>Sign up to watch your favourite content!</h1>
        <div className={styles.authFormContainer}>
          {/* Display message after non-authenticated redirect */}
          {redirectedFromAuth && (
            <div>
              <p>Ready to watch all your favourite movies?</p>
              <p>Create your account today!</p>
            </div>
          )}
          <form
            method="POST"
            onSubmit={(e) => handleSubmit(e, "signup")}
            noValidate
          >
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
                  className={styles.formField}
                  name="email"
                  type="email"
                  onChange={(e) => handleChange(e)}
                  value={formValues.email}
                  placeholder="Email Address"
                />
                {formErrors.email && hasSubmit && (
                  <span className={styles.errorMessage}>
                    {formErrors.email}
                  </span>
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
                  className={styles.formField}
                  name="password"
                  type="password"
                  onChange={(e) => handleChange(e)}
                  value={formValues.password}
                  placeholder="Password"
                />
                {formErrors.password && hasSubmit && (
                  <span className={styles.errorMessage}>
                    {formErrors.password}
                  </span>
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
                  <span className={styles.errorMessage}>
                    {formErrors.repeatPassword}
                  </span>
                )}
              </div>
              {formErrors.authError && (
                <span className={styles.errorMessage}>
                  {formErrors.authError}
                </span>
              )}
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
      </div>
    </div>
  );
}
