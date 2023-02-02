import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { userActions } from "../../../store/User/user-state";
import { EDIT_USER_BY_ID_SERVICE } from "../../../service";

import Backdrop from "../Spinkit/Backdrop";

import classes from "./Form.module.css";

function Form(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const currentData = props.data;

  const submitHandler = data => {
    const inputLocation = data.location;
    const inputHometown = data.hometown;
    const inputRelationship = data.relationship;
    const inputBiography = data.biography;

    const updateUserById = async () => {
      try {
        const res = await fetch(EDIT_USER_BY_ID_SERVICE(currentData.id), {
          method: "PUT",
          body: JSON.stringify({
            location: inputLocation,
            hometown: inputHometown,
            biography: inputBiography,
            relationship: inputRelationship,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Error: Cannot update information!");
        const data = await res.json();

        dispatch(userActions.loadCurrentUser(data));
      } catch (error) {
        console.error(error.message);
      }
    };

    updateUserById();

    props.onClose();
  };

  return (
    <Backdrop>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <p className={classes.title}>Update your information</p>

        <input
          type="text"
          placeholder="Your city"
          {...register("location", { required: true })}
          defaultValue={currentData.location}
          className={errors.location ? "invalid" : ""}
        />

        <input
          type="text"
          placeholder="Your hometown"
          {...register("hometown", { required: true })}
          defaultValue={currentData.hometown}
          className={errors.hometown ? "invalid" : ""}
        />

        <input
          type="text"
          placeholder="Your biography"
          {...register("biography", { required: true })}
          defaultValue={currentData.biography}
          className={errors.biography ? "invalid" : ""}
        />

        <select {...register("relationship")}>
          <option value="0">Single</option>
          <option value="1">In a Relationship</option>
        </select>

        <div className={classes["btn-container"]}>
          <button type="button" onClick={props.onClose} className={classes.cancel}>
            Cancel
          </button>

          <button type="submit" className={classes.submit}>
            Update
          </button>
        </div>
      </form>
    </Backdrop>
  );
}

export default Form;
