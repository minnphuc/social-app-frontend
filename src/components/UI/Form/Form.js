import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { UPDATE_ME_SERVICE } from "../../../service";

import Backdrop from "../Spinkit/Backdrop";

import classes from "./Form.module.css";

function Form(props) {
  const { token } = useSelector(state => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const currentData = props.data;

  const submitHandler = data => {
    const inputLocation = data.location;
    const inputHometown = data.hometown;
    const inputRelationship = data.relationship;
    const inputBiography = data.biography;

    const updateMe = async () => {
      try {
        const res = await fetch(UPDATE_ME_SERVICE, {
          method: "PATCH",
          body: JSON.stringify({
            location: inputLocation,
            hometown: inputHometown,
            biography: inputBiography,
            relationship: Boolean(+inputRelationship),
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const { data } = await res.json();

        if (!res.ok) throw new Error(data.message);

        props.onUpdate(data.user);
      } catch (error) {
        console.error(error.message);
      }
    };

    updateMe();

    props.onClose();
  };

  return (
    <Backdrop>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <p className={classes.title}>Update information</p>

        <div>
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            placeholder="Your city"
            {...register("location", { required: true })}
            defaultValue={currentData.location}
            className={errors.location ? "invalid" : ""}
          />
        </div>

        <div>
          <label htmlFor="hometown">Hometown: </label>
          <input
            type="text"
            placeholder="Your hometown"
            {...register("hometown", { required: true })}
            defaultValue={currentData.hometown}
            className={errors.hometown ? "invalid" : ""}
          />
        </div>

        <div>
          <label htmlFor="biography">Biography: </label>
          <input
            type="text"
            placeholder="Your biography"
            {...register("biography", { required: true })}
            defaultValue={currentData.biography}
            className={errors.biography ? "invalid" : ""}
          />
        </div>

        <div>
          <label htmlFor="relationship">Relationship:</label>
          <select {...register("relationship")}>
            <option value="0">Single</option>
            <option value="1">Married</option>
          </select>
        </div>

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
