import React from "react";

import classes from "./OnlineFriend.module.css";

function OnlineFriend(props) {
  const { name, avatar } = props.friendData;

  return (
    <li className={classes["online-friend"]}>
      <div style={{ position: "relative" }}>
        <img src={avatar} alt="friend" />
        <div className={classes["online-badge"]}></div>
      </div>
      <p>{name}</p>
    </li>
  );
}

export default OnlineFriend;
