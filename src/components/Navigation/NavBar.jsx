import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Backdrop from "../UI/Spinkit/Backdrop";
import { CHANGE_PASSWORD_SERVICE } from "../../service";
import { logoutRequest } from "../../store/Auth/auth-action";
import { getGlobalUser } from "../../store/User/user-action";
import { modalActions } from "../../store/Modal/modal-state";

import classes from "./NavBar.module.css";
import searchIcon from "../../icons/search.svg";
import personIcon from "../../icons/person.svg";
import chatIcon from "../../icons/chat.svg";
import notifIcon from "../../icons/notifications.svg";
import logoutIcon from "../../icons/logout.svg";
import passwordIcon from "../../icons/password.svg";
import closeIcon from "../../icons/close.svg";

function NavBar() {
  const userGlobData = useSelector(state => state.user);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const submitHandler = data => {
    const password = data.password;
    const newPassword = data.newPassword;
    const newPasswordConfirm = data.newPasswordConfirm;

    if (newPassword !== newPasswordConfirm) {
      dispatch(
        modalActions.open({
          content: "Confirm password have to match the password",
          type: "error",
        })
      );
      return;
    }

    const updatePassword = async () => {
      try {
        const res = await fetch(CHANGE_PASSWORD_SERVICE, {
          method: "POST",
          body: JSON.stringify({
            password,
            newPassword,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const { data } = await res.json();

        if (!res.ok) throw new Error(data.message);

        dispatch(
          modalActions.open({
            content: data.message,
            type: "success",
          })
        );
        dispatch(logoutRequest());
      } catch (error) {
        dispatch(modalActions.open({ content: error.message, type: "error" }));
        console.error(error.message);
      }
    };

    updatePassword();
  };

  const passwordChangeForm = (
    <Backdrop>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <p className={classes.title}>Change password</p>
        <img src={closeIcon} alt="close" onClick={closeFormHandler} />

        <input
          type="password"
          placeholder="Your current password"
          {...register("password", { required: true })}
          className={errors.location ? "invalid" : ""}
        />

        <input
          type="password"
          placeholder="New password"
          {...register("newPassword", { required: true })}
          className={errors.location ? "invalid" : ""}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          {...register("newPasswordConfirm", { required: true })}
          className={errors.location ? "invalid" : ""}
        />

        <button>Change password</button>
      </form>
    </Backdrop>
  );

  return (
    <>
      {isOpen && passwordChangeForm}
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
