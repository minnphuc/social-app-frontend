import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Form from "../UI/Form/Form";
import OnlineFriend from "../FriendList/OnlineFriend";
import Friend from "../FriendList/Friend";
import { GET_FOLLOWING_USERS_SERVICE } from "../../service";
import { modalActions } from "../../store/Modal/modal-state";

import classes from "./RightBar.module.css";
import editIcon from "../../icons/edit.svg";
import followingIllustration from "../../illustration/following.svg";

function RightBar(props) {
  const { id } = useParams();
  const { token, userId } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [following, setFollowing] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const isProfilePage = props.profile;
  const isMyProfile = props.myProfile;
  const profileStyle = isProfilePage ? { width: "35%" } : {};
  const userData = props.data;

  useEffect(() => {
    const fetchFollowingUser = async () => {
      try {
        const res = await fetch(
          `${GET_FOLLOWING_USERS_SERVICE}?user=${isProfilePage ? id : userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = await res.json();

        setFollowing(data.following);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    fetchFollowingUser().catch(() =>
      dispatch(
        modalActions.open({
          content: "Failed to fetch following list. Please try again later.",
          type: "error",
        })
      )
    );
  }, [id, userId, isProfilePage, token, dispatch]);

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const onlineFriendList = following.map(user => (
    <OnlineFriend
      key={user._id}
      friendData={user}
      online={props.onlineUsers?.map(u => u.userId).includes(user._id)}
      onChat={props.onChat}
    />
  ));

  const profileFriendList = following.map(user => (
    <Friend key={user._id} friendData={user} />
  ));

  // JSX

  const notFoundMsg = (
    <div className={classes["not-found-msg"]}>
      <img src={followingIllustration} alt="following" />
      <p>You haven't followed anyone yet!</p>
      <p> Start following other user to discover new content. </p>
    </div>
  );

  const homeRightBar = (
    <>
      <p>Following users</p>

      <ul className={classes["online-list"]}>
        {onlineFriendList.length !== 0 ? onlineFriendList : notFoundMsg}
      </ul>
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

      <p>Following list</p>
      <div className={classes["friend-list"]}>
        {onlineFriendList.length !== 0 && profileFriendList}
        {onlineFriendList.length === 0 && isMyProfile && notFoundMsg}
      </div>
    </>
  );

  return (
    <div className={classes.rightbar} style={profileStyle}>
      {isProfilePage ? profileRightBar : homeRightBar}
    </div>
  );
}

export default RightBar;
