import React from "react";

import OnlineFriend from "../FriendList/OnlineFriend";
import Friend from "../FriendList/Friend";

import { Users } from "../../dummyData";
import classes from "./RightBar.module.css";

function RightBar(props) {
  const isProfilePage = props.profile;
  const profileStyle = isProfilePage ? { width: "35%" } : {};

  const onlineFriendList = Users.slice(1).map(user => <OnlineFriend key={user.id} friendData={user} />);
  const profileFriendList = Users.slice(1).map(user => <Friend key={user.id} friendData={user} />);

  // JSX

  const homeRightBar = (
    <>
      <p>Online friends</p>

      <ul className={classes["online-list"]}>
        {onlineFriendList}
        {onlineFriendList}
        {onlineFriendList}
      </ul>
    </>
  );

  const profileRightBar = (
    <>
      <p>Personal information</p>
      <div className={classes["profile-info"]}>
        <div className={classes["profile-info-item"]}>
          <span>City:</span>
          <span>Ho Chi Minh</span>
        </div>

        <div className={classes["profile-info-item"]}>
          <span>From:</span>
          <span>Quang Nam</span>
        </div>

        <div className={classes["profile-info-item"]}>
          <span>Relationship:</span>
          <span>Single</span>
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
