import React, { useState } from "react";

import LoginForm from "../../components/Auth/LoginForm";
import SignupForm from "../../components/Auth/SignupForm";

import classes from "./AuthPage.module.css";

function LoginPage() {
  const [loginMode, setLoginMode] = useState(true);

  const toggleForm = () => {
    setLoginMode(state => !state);
  };

  return (
    <>
      <div className={classes.page}>
        <div className={classes.banner}>
          fakebook
          <p>Connect with friends and the world around you on Fakebook.</p>
        </div>

        {loginMode && <LoginForm onToggle={toggleForm} />}
        {!loginMode && <SignupForm onToggle={toggleForm} />}
      </div>
    </>
  );
}

export default LoginPage;
