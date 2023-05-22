import React from "react";

import calcTimePassed from "../../utils/calcTimePassed";

import classes from "./Message.module.css";

function Message(props) {
  const { user, content, sendedAt } = props.data;

  const currentMember = props.conversation.members.find(member => member._id === user);

  return (
    <div className={props.own ? `${classes.message} ${classes.own}` : classes.message}>
      <div className={classes["message-top"]}>
        <img
          className={classes["message-img"]}
          src={currentMember?.photoUrl || currentMember?.photo}
          alt=""
        />
        <p className={classes["message-text"]}>{content}</p>
      </div>

      <div className={classes["message-bottom"]}>{calcTimePassed(sendedAt)}</div>
    </div>
  );
}

export default Message;
