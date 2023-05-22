import React from "react";

import classes from "./Conversation.module.css";

function Conversation(props) {
  const friend = props.data.members.find(member => member._id !== props.currentUser);

  if (!friend.name.toLowerCase().includes(props.query)) return;

  return (
    <div onClick={props.onClick} className={classes.conversation}>
      <img
        className={classes["conversation-img"]}
        src={friend.photoUrl || friend.photo}
        alt="avatar"
      />
      <span className={classes["conversation-name"]}>{friend.name}</span>
    </div>
  );
}

export default Conversation;
