import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOtherUser } from "../../store/User/user-action";

import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/Navigation/NavBar";
import RightBar from "../../components/RightBar/RightBar";
import SideBar from "../../components/SideBar/SideBar";
import UploadForm from "./UploadForm";

import classes from "./ProfilePage.module.css";

function ProfilePage() {
  const { id } = useParams();
  const userState = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  // My wall vs. Other wall

  let isMyProfile = true;

  if (+id !== userState.curUserId) {
    dispatch(getOtherUser(id));
    isMyProfile = false;
  }

  const userData = {
    id: isMyProfile ? userState.curUserId : userState.otherUserId,
    name: isMyProfile ? userState.curUserName : userState.otherUserName,
    avatar: isMyProfile ? userState.curUserAvatar : userState.otherUserAvatar,
    location: isMyProfile ? userState.curUserLocation : userState.otherUserLocation,
    hometown: isMyProfile ? userState.curUserHometown : userState.otherUserHometown,
    relationship: isMyProfile ? userState.curUserRelationship : userState.otherUserRelationship,
    biography: isMyProfile ? userState.curUserBiography : userState.otherUserBiography,
    coverImg: isMyProfile ? userState.curUserCoverImg : userState.otherUserCoverImg,
  };

  return (
    <>
      {isOpen && isMyProfile && <UploadForm onClose={closeForm} data={userData} />}

      <NavBar />
      <div className={classes.profile}>
        <SideBar />

        <div className={classes["profile-right"]}>
          <div className="profile-right-top">
            <div className={classes["profile-cover"]}>
              <img src={userData.coverImg} alt="cover" />
              <img src={userData.avatar} alt="user" onClick={openForm} />
            </div>

            <div className={classes["profile-info"]}>
              <h4>{userData.name}</h4>
              <span>{userData.biography}</span>
            </div>
          </div>

          <div className={classes["profile-right-bottom"]}>
            <Feed profile myView={isMyProfile} />
            <RightBar profile myView={isMyProfile} data={userData} list={userState.userList} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
