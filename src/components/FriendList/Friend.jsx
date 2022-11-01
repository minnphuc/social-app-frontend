import React from "react";

import classes from "./Friend.module.css";

function Friend(props) {
  const { username, profilePicture } = props.friendData;
  return (
    <div className={classes.friend}>
      <div className={classes["friend-avatar"]}>
        <img src={profilePicture} alt="" />
      </div>
      <span>{username}</span>
    </div>
  );
}

export default Friend;
