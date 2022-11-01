import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logoutRequest } from "../../store/Auth/auth-action";

import classes from "./NavBar.module.css";
import searchIcon from "../../icons/search.svg";
import personIcon from "../../icons/person.svg";
import chatIcon from "../../icons/chat.svg";
import notifIcon from "../../icons/notifications.svg";
import logoutIcon from "../../icons/logout.svg";

function NavBar() {
  const dispatch = useDispatch();
  const [dropdownUser, setDropdownUser] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutRequest());
  };

  const toggleDropdownUser = () => {
    setDropdownUser(state => !state);
  };

  return (
    <nav className={classes["nav-bar"]}>
      <Link to="/home" className={classes.logo}>
        Fakebook
      </Link>

      <div className={classes["search-bar"]}>
        <img src={searchIcon} alt="search" />
        <input type="text" placeholder="Search for users around the world" />
      </div>

      <div className={classes.icon}>
        <img src={personIcon} alt="friends" />
      </div>

      <div className={classes.icon}>
        <img src={chatIcon} alt="chat" />
      </div>

      <div className={classes.icon}>
        <img src={notifIcon} alt="notification" />
      </div>

      <div className={classes.avatar} onClick={toggleDropdownUser}>
        <img src="assets/avatars/image-jaime.jpg" alt="" />

        {dropdownUser && (
          <div className={classes["dropdown-user"]}>
            <Link to="/profile">
              <img src="assets/avatars/image-jaime.jpg" alt="" />
              Le Minh Phuc
            </Link>

            <Link onClick={logoutHandler} to="/auth">
              <img src={logoutIcon} alt="logout" />
              <p>Logout</p>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
