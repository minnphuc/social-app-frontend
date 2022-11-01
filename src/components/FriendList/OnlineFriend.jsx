import React from "react";

import classes from "./OnlineFriend.module.css";

function OnlineFriend(props) {
  const { username, profilePicture } = props.friendData;

  return (
    <li className={classes["online-friend"]}>
      <div style={{ position: "relative" }}>
        <img src={profilePicture} alt="friend" />
        <div className={classes["online-badge"]}></div>
      </div>
      <p>{username}</p>
    </li>
  );
}

export default OnlineFriend;
