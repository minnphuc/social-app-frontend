import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CREATE_POST_SERVICE } from "../../service";
import { modalActions } from "../../store/Modal/modal-state";
import { spinnerActions } from "../../store/Spinner/spinner-state";

import photoIcon from "../../icons/photo.svg";
import closeIcon from "../../icons/close.svg";
import classes from "./Share.module.css";

function Share(props) {
  const userGlobData = useSelector(state => state.user);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const status = useRef();
  const currentFile = useRef(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

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

  const postHandler = async () => {
    const caption = status.current.value.trim();
    const file = currentFile.current;
    try {
      if (caption.length === 0 && file === null)
        throw new Error("Please provide information for your post");

      dispatch(spinnerActions.open());

      const formData = new FormData();
      file !== null && formData.append("photo", currentFile.current);
      caption.length !== 0 && formData.append("caption", caption);

      const res = await fetch(CREATE_POST_SERVICE, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await res.json();

      console.log(data);

      if (!res.ok) throw new Error(data.message);

      props.onNewPost(data.post);

      dispatch(spinnerActions.close());

      status.current.value = "";
      removeFileHandler();
    } catch (error) {
      dispatch(modalActions.open({ content: error.message, type: "error" }));
      dispatch(spinnerActions.close());
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
        <img src={userGlobData.photo} alt="avatar" />
        <textarea
          name="status"
          id="status"
          rows="2"
          placeholder="What's on your mind?"
          ref={status}
        ></textarea>
      </div>

      {uploadedImageUrl && previewImage}

      <hr />

      <div className={classes["share-bot"]}>
        <div className={classes["share-option"]}>
          <img src={photoIcon} alt="" />
          <p>Photo</p>
          <input type="file" onChange={fileUploadHandler} accept="image/*" />
        </div>

        <button onClick={postHandler}>Share</button>
      </div>
    </div>
  );
}

export default Share;
