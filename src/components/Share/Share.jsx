import React, { useRef, useState } from "react";

import photoIcon from "../../icons/photo.svg";
import closeIcon from "../../icons/close.svg";
import classes from "./Share.module.css";

function Share() {
  const statusRef = useRef();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const fileUploadHandler = e => {
    const files = Array.from(e.target.files);
    if (files.length !== 0) setUploadedImageUrl(URL.createObjectURL(files[0]));
  };

  const removeFileHandler = () => {
    setUploadedImageUrl("");
  };

  // JSX
  const previewImage = (
    <div className={classes["share-img"]}>
      <img src={closeIcon} alt="close" onClick={removeFileHandler} />
      <img src={uploadedImageUrl} alt="post" />
    </div>
  );

  return (
    <div className={classes.share}>
      <div className={classes["share-top"]}>
        <img src="assets/avatars/image-jaime.jpg" alt="avatar" />
        <textarea name="status" id="status" rows="2" placeholder="What's on your mind?" ref={statusRef}></textarea>
      </div>

      {uploadedImageUrl && previewImage}

      <hr />

      <div className={classes["share-bot"]}>
        <div className={classes["share-option"]}>
          <img src={photoIcon} alt="" />
          <p>Photo or Video</p>
          <input type="file" onChange={fileUploadHandler} />
        </div>

        <button>Share</button>
      </div>
    </div>
  );
}

export default Share;
