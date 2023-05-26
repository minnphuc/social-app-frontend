import React from "react";
import { useNavigate } from "react-router-dom";

import { GET_CONVERSATION, CREATE_CONVERSATION_SERVICE } from "../../service";
import { useSelector } from "react-redux";

import classes from "./OnlineFriend.module.css";

function OnlineFriend(props) {
  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const { _id: id, name, photo, photoUrl } = props.friendData;

  const openChat = async () => {
    try {
      let conversation;

      // Get conversation with this user
      const res = await fetch(GET_CONVERSATION(id), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();

      if (!res.ok && res.status !== 404) throw new Error(data.message);

      conversation = data.conversation;

      // If conversation doesn't exist, create one
      if (!data.conversation) {
        const res = await fetch(CREATE_CONVERSATION_SERVICE, {
          method: "POST",
          body: JSON.stringify({
            receiverId: id,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const { data } = await res.json();
        if (!res.ok) throw new Error(data.message);

        conversation = data.conversation;
      }

      // Set currentChat with the conversation
      props.onChat ? props.onChat(conversation) : navigate("/messenger");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li onClick={openChat} className={classes["online-friend"]}>
      <div style={{ position: "relative" }}>
        <img src={photoUrl || photo} alt="friend" />
        {props.online && <div className={classes["online-badge"]}></div>}
      </div>
      <p>{name}</p>
    </li>
  );
}

export default OnlineFriend;
