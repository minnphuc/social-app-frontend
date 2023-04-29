import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_USER_BY_ID_SERVICE } from "../../service";

import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/Navigation/NavBar";
import RightBar from "../../components/RightBar/RightBar";
import SideBar from "../../components/SideBar/SideBar";
import UploadForm from "./UploadForm";

import classes from "./ProfilePage.module.css";

function ProfilePage() {
  const { id } = useParams();
  const userGlobData = useSelector(state => state.user);

  const [displayedUser, setDisplayedUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const formUpdating = useRef("");

  useEffect(() => {
    const fetchCurUser = async () => {
      try {
        const res = await fetch(GET_USER_BY_ID_SERVICE(id));
        const { data } = await res.json();

        if (!res.ok) throw new Error(data.message);

        setDisplayedUser(data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCurUser();
  }, [id]);

  const updateMe = me => {
    //? SAVING COST
    setDisplayedUser(state => {
      return {
        ...me,
        photoUrl: me.photoUrl || state.photoUrl,
        coverUrl: me.coverUrl || state.coverUrl,
      };
    });
  };

  const openForm = e => {
    formUpdating.current = e.target.alt;
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const isMyProfile = id === userGlobData.id;

  return (
    <>
      {isOpen && isMyProfile && (
        <UploadForm
          onUpdate={updateMe}
          onClose={closeForm}
          updating={formUpdating.current}
          oldPhoto={{ avatar: displayedUser.photo, cover: displayedUser.cover }}
        />
      )}

      <NavBar />
      <div className={classes.profile}>
        <SideBar />

        <div className={classes["profile-right"]}>
          <div className="profile-right-top">
            <div className={classes["profile-cover"]}>
              <img
                src={displayedUser.coverUrl || displayedUser.cover}
                alt="cover"
                onClick={openForm}
              />
              <img
                src={displayedUser.photoUrl || displayedUser.photo}
                alt="avatar"
                onClick={openForm}
              />
            </div>

            <div className={classes["profile-info"]}>
              <h4>{displayedUser.name}</h4>
              <span>{displayedUser.biography}</span>
            </div>
          </div>

          <div className={classes["profile-right-bottom"]}>
            <Feed profile myProfile={isMyProfile} />
            <RightBar
              profile
              myProfile={isMyProfile}
              data={displayedUser}
              list={userGlobData.userList}
              onUpdate={updateMe}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
