import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from "../UI/Spinkit/Backdrop";

import { CHANGE_PASSWORD_SERVICE } from "../../service";
import { logoutRequest } from "../../store/Auth/auth-action";
import { modalActions } from "../../store/Modal/modal-state";

import classes from "./PopupForm.module.css";
import closeIcon from "../../icons/close.svg";

function ChangePasswordForm(props) {
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = data => {
    const password = data.password;
    const newPassword = data.newPassword;
    const newPasswordConfirm = data.newPasswordConfirm;

    if (newPassword !== newPasswordConfirm) {
      dispatch(
        modalActions.open({
          content: "Confirm password have to match the password",
          type: "error",
        })
      );
      return;
    }

    const updatePassword = async () => {
      try {
        const res = await fetch(CHANGE_PASSWORD_SERVICE, {
          method: "POST",
          body: JSON.stringify({
            password,
            newPassword,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const { data } = await res.json();

        if (!res.ok) throw new Error(data.message);

        dispatch(
          modalActions.open({
            content: data.message,
            type: "success",
          })
        );
        dispatch(logoutRequest());
      } catch (error) {
        dispatch(modalActions.open({ content: error.message, type: "error" }));
        console.error(error.message);
      }
    };

    updatePassword();
  };

  return (
    <Backdrop>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <p className={classes.title}>Change your password</p>
        <img src={closeIcon} alt="close" onClick={props.onClose} />

        <input
          type="password"
          placeholder="Your current password"
          {...register("password", { required: true })}
          className={errors.password ? "invalid" : ""}
        />

        <input
          type="password"
          placeholder="New password"
          {...register("newPassword", { required: true })}
          className={errors.newPassword ? "invalid" : ""}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          {...register("newPasswordConfirm", { required: true })}
          className={errors.newPasswordConfirm ? "invalid" : ""}
        />

        <button>Change password</button>
      </form>
    </Backdrop>
  );
}

export default ChangePasswordForm;
