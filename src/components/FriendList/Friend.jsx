import React from "react";

import classes from "./Friend.module.css";
import { Link } from "react-router-dom";

function Friend(props) {
  const { name, avatar, id } = props.friendData;
  return (
    <Link to={`/profile/${id}`}>
      <div className={classes.friend}>
        <div className={classes["friend-avatar"]}>
          <img src={avatar} alt="friend_ava" />
        </div>
        <span>{name}</span>
      </div>
    </Link>
  );
}

export default Friend;
