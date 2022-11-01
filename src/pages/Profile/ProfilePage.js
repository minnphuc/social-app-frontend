import React, { useState } from "react";

import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/Navigation/NavBar";
import RightBar from "../../components/RightBar/RightBar";
import SideBar from "../../components/SideBar/SideBar";
import UploadForm from "./UploadForm";

import classes from "./ProfilePage.module.css";

function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <UploadForm onClose={closeForm} />}

      <NavBar />
      <div className={classes.profile}>
        <SideBar />

        <div className={classes["profile-right"]}>
          <div className="profile-right-top">
            <div className={classes["profile-cover"]}>
              <img src="assets/img1.jpg" alt="cover" />
              <img src="assets/avatars/image-jaime.jpg" alt="user" onClick={openForm} />
            </div>

            <div className={classes["profile-info"]}>
              <h4>Le Minh Phuc</h4>
              <span>Not Wibu</span>
            </div>
          </div>

          <div className={classes["profile-right-bottom"]}>
            <Feed profile />
            <RightBar profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
