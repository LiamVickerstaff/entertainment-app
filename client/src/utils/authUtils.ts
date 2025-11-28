// Checks form is valid
export function validateForm(values: {
  email: string;
  password: string;
  repeatPassword: string;
}) {
  // Checks if email or password are empty
  const errors = { email: "", password: "", repeatPassword: "" };

  if (!values.email) errors.email = "Can't be empty";
  else if (!validateEmail(values.email)) errors.email = "Invalid email";

  if (!values.password) errors.password = "Can't be empty";

  if (!values.repeatPassword) errors.repeatPassword = "Can't be empty";
  else if (values.password !== values.repeatPassword)
    errors.repeatPassword = "Passwords don't match";

  return errors;
}

// Checks for valid email
export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log("validating email", re.test(email));
  return re.test(email);
}
