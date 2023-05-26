import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { RESET_PASSWORD_SERVICE } from "../../service";
import { modalActions } from "../../store/Modal/modal-state";
import { spinnerActions } from "../../store/Spinner/spinner-state";

import classes from "./Form.module.css";

function ResetForm() {
  const dispatch = useDispatch();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async inputData => {
    const password = inputData.password;
    const passwordConfirm = inputData.passwordConfirm;
    const resetToken = params.resetToken;

    if (password !== passwordConfirm) {
      dispatch(
        modalActions.open({
          content: "Confirm password have to match the password",
          type: "error",
        })
      );
      return;
    }

    dispatch(spinnerActions.open());

    try {
      const res = await fetch(RESET_PASSWORD_SERVICE(resetToken), {
        method: "PATCH",
        body: JSON.stringify({
          password,
          passwordConfirm,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();
      if (!res.ok) throw new Error(data.message);

      dispatch(spinnerActions.close());
      dispatch(
        modalActions.open({
          content: `${data.message}. You can close this page now.`,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(spinnerActions.close());
      dispatch(modalActions.open({ content: error.message, type: "error" }));
    }
  };

  return (
    <form
      className={classes.form}
      style={{ left: "50%" }}
      onSubmit={handleSubmit(submitHandler)}
    >
      <input
        type="password"
        placeholder="New password"
        {...register("password", { required: true })}
        className={errors.password ? "invalid" : ""}
      />

      <input
        type="password"
        placeholder="Password confirm"
        {...register("passwordConfirm", { required: true })}
        className={errors.passwordConfirm ? "invalid" : ""}
      />

      <button className={classes.login}>Submit</button>
    </form>
  );
}

export default ResetForm;
