import styles from "./auth.module.css";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const { formValues, formErrors, hasSubmit, handleChange, handleSubmit } =
    useAuth();

  return (
    <div className={styles.topContainer}>
      <div className={styles.authFormContainer}>
        <form
          method="POST"
          onSubmit={(e) => handleSubmit(e, "login")}
          noValidate
        >
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
                <span className={styles.errorMessage}>
                  {formErrors.password}
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
    </div>
  );
}
