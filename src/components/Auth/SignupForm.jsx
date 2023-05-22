import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { signupRequest } from "../../store/Auth/auth-action";
import { modalActions } from "../../store/Modal/modal-state";

import classes from "./Form.module.css";

function SignupForm(props) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = data => {
    if (data.password === data.passwordConfirm) dispatch(signupRequest(data));
    else
      dispatch(
        modalActions.open({
          content: "Confirm password have to match the password",
          type: "error",
        })
      );
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <input
        type="text"
        placeholder="Your name"
        {...register("name", { required: true })}
        className={errors.name ? "invalid" : ""}
      />

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
        minLength={6}
      />

      <input
        type="password"
        placeholder="Confirm password"
        {...register("passwordConfirm", { required: true })}
        className={errors.passwordConfirm ? "invalid" : ""}
        minLength={6}
      />

      <button type="submit" className={classes.login}>
        Sign Up
      </button>
      <button type="button" className={classes.signup} onClick={props.onToggle}>
        Login to Account
      </button>
    </form>
  );
}

export default SignupForm;
