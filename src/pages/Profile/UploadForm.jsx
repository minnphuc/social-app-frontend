import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { UPDATE_ME_SERVICE } from "../../service";
import { modalActions } from "../../store/Modal/modal-state";
import { spinnerActions } from "../../store/Spinner/spinner-state";

import Backdrop from "../../components/UI/Spinkit/Backdrop";

import classes from "./UploadForm.module.css";
import closeIcon from "../../icons/close.svg";
import photoIcon from "../../icons/photo.svg";

function UploadForm(props) {
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const currentFile = useRef(null);
  const [uploadedImgUrl, setUploadedImageUrl] = useState("");

  const fileUploadHandler = e => {
    const files = Array.from(e.target.files);
    if (files.length !== 0) {
      currentFile.current = files[0];
      setUploadedImageUrl(URL.createObjectURL(files[0]));
    }
  };

  const removeFileHandler = () => {
    currentFile.current = null;
    setUploadedImageUrl("");
  };

  const submitFileHandler = async () => {
    try {
      if (currentFile.current === null)
        throw new Error("Please choose an image from your computer");

      dispatch(spinnerActions.open());

      const formData = new FormData();
      formData.append("photo", currentFile.current);
      formData.append(
        "oldPhoto",
        props.updating === "avatar" ? props.oldPhoto.avatar : props.oldPhoto.cover
      );
      formData.append("imageType", props.updating);

      const res = await fetch(UPDATE_ME_SERVICE, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await res.json();

      if (!res.ok) throw new Error(data.message);

      props.onUpdate(data.user);
      props.onClose();

      dispatch(spinnerActions.close());
    } catch (error) {
      dispatch(spinnerActions.close());
      dispatch(modalActions.open({ content: error.message, type: "error" }));
    }
  };

  // JSX
  const formContent = uploadedImgUrl ? (
    <div className={classes["upload-img"]}>
      <img src={closeIcon} alt="close" onClick={removeFileHandler} />
      <img src={uploadedImgUrl} alt="" />
    </div>
  ) : (
    <div className={classes.uploader}>
      <img src={photoIcon} className={classes.photo} alt="" />
      <div>Choose a file or Drag & drop any files</div>
      <input type="file" onChange={fileUploadHandler} />
    </div>
  );

  return (
    <Backdrop>
      <div className={classes.modal}>
        <div className={classes.header}>
          <p>Change your {props.updating}</p>
        </div>
        <hr />

        <div className={classes.content}>{formContent}</div>

        <div className={classes.action}>
          <button onClick={props.onClose} style={{ backgroundColor: "#3c3c3c" }}>
            Cancel
          </button>
          <button onClick={submitFileHandler}>Change {props.updating}</button>
        </div>
      </div>
    </Backdrop>
  );
}

export default UploadForm;
