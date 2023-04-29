import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logoutRequest } from "../../store/Auth/auth-action";
import { getGlobalUser } from "../../store/User/user-action";

import classes from "./NavBar.module.css";
import searchIcon from "../../icons/search.svg";
import personIcon from "../../icons/person.svg";
import chatIcon from "../../icons/chat.svg";
import notifIcon from "../../icons/notifications.svg";
import logoutIcon from "../../icons/logout.svg";

function NavBar() {
  const userGlobData = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [dropdownUser, setDropdownUser] = useState(false);

  useEffect(() => {
    dispatch(getGlobalUser());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logoutRequest());
  };

  const toggleDropdownUser = () => {
    setDropdownUser(state => !state);
  };

  return (
    <nav className={classes["nav-bar"]}>
      <Link to="/home" className={classes.logo}>
        fakebook
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

      <div className={classes.photo} onClick={toggleDropdownUser}>
        <img src={userGlobData.photo} alt="" />

        {dropdownUser && (
          <div className={classes["dropdown-user"]}>
            <Link to={`/profile/${userGlobData.id}`}>
              <img src={userGlobData.photo} alt="" />
              {userGlobData.name}
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
