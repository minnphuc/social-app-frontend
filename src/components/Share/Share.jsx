import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPLOAD_POST_SERVICE, ADD_POST_SERVICE } from "../../service";

import photoIcon from "../../icons/photo.svg";
import closeIcon from "../../icons/close.svg";
import classes from "./Share.module.css";
import { postActions } from "../../store/Post/post-state";

function Share() {
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();

  const statusRef = useRef();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [currentFile, setCurrentFile] = useState(null);

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

  const postHandler = async () => {
    if (currentFile === null) return;

    const fileName = currentFile.name;

    const data = new FormData();
    data.append("file", currentFile);

    const desc = statusRef.current.value;
    const photo = `/assets/${fileName}`;
    const postedAt = new Date().toString();
    const userId = userData.curUserId;

    try {
      fetch(UPLOAD_POST_SERVICE, {
        method: "POST",
        body: data,
      }).then(res => console.log(res));

      const res = await fetch(ADD_POST_SERVICE, {
        method: "POST",
        body: JSON.stringify({
          description: desc,
          photo,
          postedAt,
          userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Error: Cannot post status!");
      const resData = await res.json();

      dispatch(postActions.addPost(resData));

      removeFileHandler();
      statusRef.current.value = "";
    } catch (error) {
      console.error(error.message);
    }
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
        <img src={userData.curUserAvatar} alt="avatar" />
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

        <button onClick={postHandler}>Share</button>
      </div>
    </div>
  );
}

export default Share;
