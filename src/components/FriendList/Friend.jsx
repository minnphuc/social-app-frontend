import React from "react";

import classes from "./Friend.module.css";
import { Link } from "react-router-dom";

function Friend(props) {
  const { name, photo, _id } = props.friendData;
  return (
    <Link to={`/profile/${_id}`}>
      <div className={classes.friend}>
        <div className={classes["friend-avatar"]}>
          <img src={photo} alt="friend_ava" />
        </div>
        <span>{name}</span>
      </div>
    </Link>
  );
}

export default Friend;
