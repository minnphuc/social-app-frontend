import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ChangePasswordForm from "../Auth/ChangePasswordForm";
import { logoutRequest } from "../../store/Auth/auth-action";
import { getGlobalUser } from "../../store/User/user-action";

import classes from "./NavBar.module.css";
import searchIcon from "../../icons/search.svg";
import personIcon from "../../icons/person.svg";
import chatIcon from "../../icons/chat.svg";
import notifIcon from "../../icons/notifications.svg";
import logoutIcon from "../../icons/logout.svg";
import passwordIcon from "../../icons/password.svg";

function NavBar() {
  const userGlobData = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownUser, setDropdownUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef("");

  useEffect(() => {
    dispatch(getGlobalUser());
  }, [dispatch]);

  const searchHandler = e => {
    e.preventDefault();
    const query = searchRef.current.value;
    if (query.length === 0) return;
    navigate(`/search?query=${query}`);
  };

  const logoutHandler = () => {
    dispatch(logoutRequest());
  };

  const toggleDropdownUser = () => {
    setDropdownUser(state => !state);
  };

  const openFormHandler = () => {
    setIsOpen(true);
  };
  const closeFormHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <ChangePasswordForm onClose={closeFormHandler} />}

      <nav className={classes["nav-bar"]}>
        <Link to="/home" className={classes.logo}>
          fakebook
        </Link>

        <div className={classes["search-bar"]}>
          <form onSubmit={searchHandler}>
            <button>
              <img src={searchIcon} alt="search" />
            </button>
            <input
              type="text"
              placeholder="Search for users around the world"
              ref={searchRef}
            />
          </form>
        </div>

        <div className={classes.icon}>
          <img src={personIcon} alt="friends" />
        </div>

        <Link to="/messenger" className={classes.icon}>
          <img src={chatIcon} alt="chat" />
        </Link>

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

              <Link onClick={openFormHandler}>
                <img src={passwordIcon} alt="password" />
                <p>Change password</p>
              </Link>

              <Link onClick={logoutHandler} to="/auth">
                <img src={logoutIcon} alt="logout" />
                <p>Logout</p>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
