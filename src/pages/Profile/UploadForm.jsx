import React, { useState } from "react";
import Backdrop from "../../components/UI/Spinkit/Backdrop";

import classes from "./UploadForm.module.css";
import closeIcon from "../../icons/close.svg";
import photoIcon from "../../icons/photo.svg";

function UploadForm(props) {
  const [uploadedImgUrl, setUploadedImageUrl] = useState("");

  const fileUploadHandler = e => {
    const files = Array.from(e.target.files);
    if (files.length !== 0) setUploadedImageUrl(URL.createObjectURL(files[0]));
  };

  const removeFileHandler = () => {
    setUploadedImageUrl("");
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
          <button>OK</button>
        </div>
      </div>
    </Backdrop>
  );
}

export default UploadForm;
