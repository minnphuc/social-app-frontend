import React, { useState } from "react";

import LoginForm from "../../components/Auth/LoginForm";
import SignupForm from "../../components/Auth/SignupForm";
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";

import classes from "./AuthPage.module.css";

function LoginPage() {
  const [loginMode, setLoginMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => setLoginMode(state => !state);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  return (
    <>
      <div className={classes.page}>
        <div className={classes.banner}>
          fakebook
          <p>Connect with friends and the world around you on Fakebook.</p>
        </div>

        {loginMode && <LoginForm onForgotPassword={openForm} onToggle={toggleForm} />}
        {!loginMode && <SignupForm onToggle={toggleForm} />}
      </div>

      {isOpen && <ForgotPasswordForm onClose={closeForm} />}
    </>
  );
}

export default LoginPage;
