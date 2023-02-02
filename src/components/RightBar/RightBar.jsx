import React, { useState } from "react";
import { useSelector } from "react-redux";

import Form from "../UI/Form/Form";

import OnlineFriend from "../FriendList/OnlineFriend";
import Friend from "../FriendList/Friend";

import classes from "./RightBar.module.css";
import editIcon from "../../icons/edit.svg";

function RightBar(props) {
  const [formIsDisplayed, setFormIsDisplayed] = useState(false);
  const { userId: currentUserId } = useSelector(state => state.auth);

  const openForm = () => {
    setFormIsDisplayed(true);
  };

  const closeForm = () => {
    setFormIsDisplayed(false);
  };

  const isProfilePage = props.profile;
  const profileStyle = isProfilePage ? { width: "35%" } : {};
  const isMyProfile = props.myView;
  const userData = props.data;
  const userList = props.list;

  const onlineFriendList = userList
    .filter(user => user.id !== +currentUserId)
    .map(user => <OnlineFriend key={user.id} friendData={user} />);
  const profileFriendList = userList
    .filter(user => user.id !== +currentUserId)
    .map(user => <Friend key={user.id} friendData={user} />);

  // JSX

  const homeRightBar = (
    <>
      <p>Online friends</p>

      <ul className={classes["online-list"]}>{onlineFriendList}</ul>
    </>
  );

  const profileRightBar = (
    <>
      {formIsDisplayed && <Form onClose={closeForm} data={userData} />}
      <p>
        Personal information{" "}
        {isMyProfile && <img src={editIcon} alt="edit" onClick={openForm} className={classes.icon} />}
      </p>
      <div className={classes["profile-info"]}>
        <div className={classes["profile-info-item"]}>
          <span>City:</span>
          <span>{userData?.location}</span>
        </div>

        <div className={classes["profile-info-item"]}>
          <span>From:</span>
          <span>{userData?.hometown}</span>
        </div>

        <div className={classes["profile-info-item"]}>
          <span>Relationship:</span>
          <span>{userData?.relationship === 1 ? "In a Relationship" : "Single"}</span>
        </div>
      </div>

      <p>Friend list</p>
      <div className={classes["friend-list"]}>{profileFriendList}</div>
    </>
  );

  return (
    <div className={classes.rightbar} style={profileStyle}>
      {isProfilePage ? profileRightBar : homeRightBar}
    </div>
  );
}

export default RightBar;
