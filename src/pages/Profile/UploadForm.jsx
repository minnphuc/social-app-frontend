import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/User/user-state";
import { UPLOAD_AVATAR_SERVICE, CHANGE_AVATAR_SERVICE } from "../../service";

import Backdrop from "../../components/UI/Spinkit/Backdrop";

import classes from "./UploadForm.module.css";
import closeIcon from "../../icons/close.svg";
import photoIcon from "../../icons/photo.svg";

function UploadForm(props) {
  const [uploadedImgUrl, setUploadedImageUrl] = useState("");
  const [currentFile, setCurrentFile] = useState(null);
  const dispatch = useDispatch();

  const { id } = props.data;

  const fileUploadHandler = e => {
    const files = Array.from(e.target.files);
    if (files.length !== 0) {
      setUploadedImageUrl(URL.createObjectURL(files[0]));
      setCurrentFile(files[0]);
    }
  };

  const removeFileHandler = () => {
    setUploadedImageUrl("");
  };

  const submitFileHandler = async () => {
    if (currentFile == null) return;

    const fileName = currentFile.name;

    const data = new FormData();
    data.append("file", currentFile);

    try {
      fetch(UPLOAD_AVATAR_SERVICE, {
        method: "POST",
        body: data,
      }).then(res => console.log(res));

      const res = await fetch(CHANGE_AVATAR_SERVICE(id), {
        method: "PUT",
        body: JSON.stringify({
          avatar: `/assets/avatars/${fileName}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Error: Cannot update avatar!");
      const resData = await res.json();

      dispatch(userActions.loadCurrentUser(resData));
    } catch (error) {
      console.error(error.message);
    }

    props.onClose();
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
          <p>Change your avatar</p>
        </div>
        <hr />

        <div className={classes.content}>{formContent}</div>

        <div className={classes.action}>
          <button onClick={props.onClose} style={{ backgroundColor: "#3c3c3c" }}>
            Cancel
          </button>
          <button onClick={submitFileHandler}>OK</button>
        </div>
      </div>
    </Backdrop>
  );
}

export default UploadForm;
