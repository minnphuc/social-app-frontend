import React, { useRef } from "react";
import { useSelector } from "react-redux";

import classes from "./MessageBox.module.css";
import sendIcon from "../../icons/send.svg";

function MessageBox(props) {
  const userGlobData = useSelector(state => state.user);

  const inputRef = useRef("");

  const addMessage = e => {
    e.preventDefault();
    const content = inputRef.current.value;
    if (content.length === 0) return;

    props.onNewMessage(content);

    inputRef.current.value = "";
  };

  return (
    <form onSubmit={addMessage} className={classes.input_message}>
      <img className={classes.avatar} src={userGlobData.photo} alt="avatar" />
      <input
        ref={inputRef}
        className={classes.message_box}
        type="text"
        placeholder="Send a message..."
      />
      <img onClick={addMessage} className={classes.send_btn} src={sendIcon} alt="send" />
    </form>
  );
}

export default MessageBox;
