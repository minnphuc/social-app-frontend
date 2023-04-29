import React, { useState } from "react";
import { useSelector } from "react-redux";

import Form from "../UI/Form/Form";
import OnlineFriend from "../FriendList/OnlineFriend";
import Friend from "../FriendList/Friend";

import classes from "./RightBar.module.css";
import editIcon from "../../icons/edit.svg";

function RightBar(props) {
  const userGlobData = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const isProfilePage = props.profile;
  const isMyProfile = props.myProfile;
  const profileStyle = isProfilePage ? { width: "35%" } : {};
  const userData = props.data;
  const userList = props.list;

  const onlineFriendList = userList
    .filter(user => user._id !== userGlobData.userId)
    .map(user => <OnlineFriend key={user._id} friendData={user} />);

  const profileFriendList = userList
    .filter(user => user._id !== userGlobData.userId)
    .map(user => <Friend key={user._id} friendData={user} />);

  // JSX

  const homeRightBar = (
    <>
      <p>Online friends</p>

      <ul className={classes["online-list"]}>{onlineFriendList}</ul>
    </>
  );

  const profileRightBar = (
    <>
      {isOpen && <Form data={userData} onClose={closeForm} onUpdate={props.onUpdate} />}
      <p>
        Personal information
        {isMyProfile && (
          <img src={editIcon} alt="edit" onClick={openForm} className={classes.icon} />
        )}
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
          <span>{userData?.relationship ? "Married" : "Single"}</span>
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
