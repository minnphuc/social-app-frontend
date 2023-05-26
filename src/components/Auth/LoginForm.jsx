import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../store/Auth/auth-action";

import classes from "./Form.module.css";

function LoginForm(props) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = data => {
    const inputEmail = data.email;
    const inputPassword = data.password;

    dispatch(loginRequest(inputEmail, inputPassword));
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <input
        type="email"
        placeholder="Email address"
        {...register("email", { required: true })}
        className={errors.email ? "invalid" : ""}
      />

      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
        className={errors.password ? "invalid" : ""}
      />

      <button type="submit" className={classes.login}>
        Log In
      </button>

      <span onClick={props.onForgotPassword}>Forgotten password?</span>
      <hr />

      <button type="button" className={classes.signup} onClick={props.onToggle}>
        Create a new account
      </button>
    </form>
  );
}

export default LoginForm;
