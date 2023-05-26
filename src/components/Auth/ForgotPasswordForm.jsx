import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Backdrop from "../UI/Spinkit/Backdrop";
import { FORGOT_PASSWORD_SERVICE } from "../../service";
import { modalActions } from "../../store/Modal/modal-state";
import { spinnerActions } from "../../store/Spinner/spinner-state";

import classes from "./PopupForm.module.css";
import closeIcon from "../../icons/close.svg";

function ForgotPasswordForm(props) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async inputData => {
    try {
      const email = inputData.email;

      dispatch(spinnerActions.open());

      const res = await fetch(FORGOT_PASSWORD_SERVICE, {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();

      if (!res.ok) throw new Error(data.message);

      dispatch(spinnerActions.close());
      dispatch(modalActions.open({ content: data.message, type: "success" }));
    } catch (error) {
      dispatch(spinnerActions.close());
      dispatch(modalActions.open({ content: error.message, type: "error" }));
    }
  };

  return (
    <Backdrop>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <p className={classes.title}>Reset your password</p>
        <img src={closeIcon} alt="close" onClick={props.onClose} />

        <input
          type="email"
          placeholder="Your email"
          {...register("email", { required: true })}
          className={errors.email ? "invalid" : ""}
        />

        <button>Submit</button>
      </form>
    </Backdrop>
  );
}

export default ForgotPasswordForm;
