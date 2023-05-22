import React from "react";
import { Link } from "react-router-dom";

import classes from "./ChatBoxInfo.module.css";

function ChatBoxInfo(props) {
  const memberPhoto = props.member.photoUrl || props.member.photo;
  const online = props.onlineUsers?.map(u => u.userId).includes(props.member._id);

  return (
    <div className={classes.info}>
      <div style={{ position: "relative" }}>
        <img src={memberPhoto} alt="avatar" />
        {online && <div className={classes["online-badge"]}></div>}
      </div>

      <Link to={`/profile/${props.member._id}`}>{props.member.name}</Link>
    </div>
  );
}

export default ChatBoxInfo;
