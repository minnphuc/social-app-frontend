import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { userActions } from "../../store/User/user-state";
import { spinnerActions } from "../../store/Spinner/spinner-state";
import { modalActions } from "../../store/Modal/modal-state";
import followUser from "../../utils/followUser";

import classes from "./SearchItem.module.css";
import addIcon from "../../icons/add.svg";
import checkedIcon from "../../icons/checked.svg";

function SearchItem({ userData }) {
  const { followingList } = useSelector(state => state.user);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const isFollowing = followingList.some(id => id === userData._id);

  const followHandler = async () => {
    try {
      dispatch(spinnerActions.open());

      const updatedFollowingList = await followUser(token, followingList, userData._id);

      dispatch(userActions.updateFollowingList(updatedFollowingList));
      dispatch(spinnerActions.close());
    } catch (error) {
      dispatch(modalActions.open({ content: error.message, type: "error" }));
    }
  };

  return (
    <div className={classes["search-item"]}>
      <div className={classes["search-item-img"]}>
        <img src={userData.photoUrl || userData.photo} alt="avatar" />
      </div>
      <div className={classes["search-item-info"]}>
        <Link to={`/profile/${userData._id}`}>{userData.name}</Link>

        {userData.location && <span>Living in {userData.location}</span>}
        {userData.hometown && <span>Come from {userData.hometown}</span>}
      </div>

      <div className={classes["search-item-action"]}>
        <button
          onClick={followHandler}
          className={!isFollowing ? classes["btn-active"] : ""}
        >
          <img src={isFollowing ? checkedIcon : addIcon} alt="add" />
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default SearchItem;
