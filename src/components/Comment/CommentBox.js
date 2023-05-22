import React, { useRef } from "react";
import { useSelector } from "react-redux";

import classes from "./CommentBox.module.css";
import sendIcon from "../../icons/send.svg";

function CommentBox(props) {
  const userGlobData = useSelector(state => state.user);

  const inputRef = useRef("");

  const addComment = e => {
    e.preventDefault();
    const content = inputRef.current.value;
    if (content.length === 0) return;

    props.onNewComment(content);

    inputRef.current.value = "";
  };

  const replyStyle = props.replyTo ? { width: "85%", marginLeft: "2rem" } : {};

  return (
    <form onSubmit={addComment} className={classes.input_comment} style={replyStyle}>
      <img className={classes.avatar} src={userGlobData.photo} alt="avatar" />
      <input
        ref={inputRef}
        className={classes.comment_box}
        type="text"
        placeholder={props.replyTo ? `Reply to @${props.replyTo}` : "Leave a comment..."}
      />
      <img onClick={addComment} className={classes.send_btn} src={sendIcon} alt="send" />
    </form>
  );
}

export default CommentBox;
