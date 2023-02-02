import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LIKE_POST_SERVICE } from "../../service";
import { getAllPost } from "../../store/Post/post-action";

import moreIcon from "../../icons/more.svg";
import likeIcon from "../../icons/like.svg";
import likeCountIcon from "../../icons/like_count.svg";
import likeFilledIcon from "../../icons/like_filled.svg";
import commentIcon from "../../icons/comment.svg";

import classes from "./Post.module.css";

const calcTimePassed = postedAt => {
  const timePassed = new Date() - new Date(postedAt);
  const minutePassed = Math.ceil(timePassed / 1000 / 60);

  if (minutePassed < 1) return "Just now";

  if (minutePassed < 60) return `${minutePassed} minutes ago`;

  if (minutePassed < 1440) return `${Math.ceil(minutePassed / 60)} hours ago`;

  return `${new Date(postedAt).getDate()}/${new Date(postedAt).getMonth() + 1}/${new Date(postedAt).getFullYear()}`;
};

function Post(props) {
  const userState = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { id, userId, description = "", photo, postedAt, likedBy, commentCount } = props.postData;
  const userPosted = userState.userList.find(user => user.id === userId);

  const likedByArr = likedBy === null ? [] : likedBy.split(" ");
  const isLiked = likedByArr.some(id => +id === userState.curUserId);

  const likeHandler = async () => {
    if (isLiked) {
      const updatedLiked = likedByArr.filter(id => +id !== userState.curUserId);
      const res = await fetch(LIKE_POST_SERVICE(id), {
        method: "PUT",
        body: JSON.stringify({
          likedBy: updatedLiked.join(" "),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
    }

    if (!isLiked) {
      likedByArr.push(userState.curUserId);
      const res = await fetch(LIKE_POST_SERVICE(id), {
        method: "PUT",
        body: JSON.stringify({
          likedBy: likedByArr.join(" "),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
    }

    dispatch(getAllPost());
  };

  return (
    <div className={classes.post}>
      <div className={classes["post-top"]}>
        <div className={classes["post-info"]}>
          <img src={userPosted?.avatar} alt="avatar" />
          <p>{userPosted?.name}</p>
          <p>{calcTimePassed(postedAt)}</p>
        </div>
        <img src={moreIcon} alt="more" />
      </div>

      <div className={classes["post-center"]}>
        <p>{description}</p>
        <img src={photo} alt="post" />
      </div>

      <div className={classes["post-bot"]}>
        <div className={classes["post-count"]}>
          <div>
            <img src={likeCountIcon} alt="like" />
            <p>{likedByArr.length} people like this post</p>
          </div>
          <p>{commentCount} comments</p>
        </div>

        <div className={classes["post-action"]}>
          <button onClick={likeHandler} style={{ color: isLiked ? "#1875f0" : "" }}>
            <img src={isLiked ? likeFilledIcon : likeIcon} alt="like" />
            Like
          </button>

          <button>
            <img src={commentIcon} alt="comment" />
            Comments
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
