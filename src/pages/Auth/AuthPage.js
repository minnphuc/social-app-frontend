import React, { useState } from "react";
import { useSelector } from "react-redux";

import LoginForm from "../../components/Auth/LoginForm";
import SignupForm from "../../components/Auth/SignupForm";
import SpinKit from "../../components/UI/Spinkit/SpinKit";

import classes from "./AuthPage.module.css";

function LoginPage() {
  const [loginMode, setLoginMode] = useState(true);
  const { isLoading } = useSelector(state => state.auth);

  const toggleForm = () => {
    setLoginMode(state => !state);
  };

  return (
    <>
      {isLoading && <SpinKit />}
      <div className={classes.page}>
        <div className={classes.banner}>
          Fakebook
          <p>Connect with friends and the world around you on Fakebook.</p>
        </div>

        {loginMode && <LoginForm onToggle={toggleForm} />}
        {!loginMode && <SignupForm onToggle={toggleForm} />}
      </div>
    </>
  );
}

export default LoginPage;
