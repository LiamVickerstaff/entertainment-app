import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";

function App() {
  return (
    <>
      <img
        className="loginLogo"
        src="/entertainment-web-app-favicon.svg"
        alt="entertainment app"
      />
      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
      </Routes>
    </>
  );
}

export default App;
