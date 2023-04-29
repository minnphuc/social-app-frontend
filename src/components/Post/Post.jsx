import React from "react";
import { useSelector } from "react-redux";
import { UPDATE_POST_SERVICE } from "../../service";

import moreIcon from "../../icons/more.svg";
import likeIcon from "../../icons/like.svg";
import likeCountIcon from "../../icons/like_count.svg";
import likeFilledIcon from "../../icons/like_filled.svg";
import commentIcon from "../../icons/comment.svg";

import classes from "./Post.module.css";

const calcTimePassed = postedAt => {
  const timePassed = Date.now() - new Date(postedAt);
  const minutePassed = Math.ceil(timePassed / 1000 / 60);

  if (minutePassed < 1) return "Just now";

  if (minutePassed < 60) return `${minutePassed} minutes ago`;

  if (minutePassed < 1440) return `${Math.floor(minutePassed / 60)} hours ago`;

  if (minutePassed < 10080) return `${Math.floor(minutePassed / 60 / 24)} days ago`;

  return `${new Date(postedAt).getDate()}/${new Date(postedAt).getMonth() + 1}/${new Date(
    postedAt
  ).getFullYear()}`;
};

function Post(props) {
  const userGlobData = useSelector(state => state.user);
  const { token } = useSelector(state => state.auth);

  const { _id: id, user, caption, photoUrl, postedAt, likedBy, commentCount } = props.postData;

  const isLiked = likedBy.some(id => id === userGlobData.id);

  const likeHandler = async () => {
    if (isLiked) {
      const updatedLiked = likedBy.filter(id => id !== userGlobData.id);

      const res = await fetch(UPDATE_POST_SERVICE(id), {
        method: "PATCH",
        body: JSON.stringify({
          likedBy: updatedLiked,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await res.json();

      props.onLikePost(data.post);
    }

    if (!isLiked) {
      likedBy.push(userGlobData.id);

      const res = await fetch(UPDATE_POST_SERVICE(id), {
        method: "PATCH",
        body: JSON.stringify({
          likedBy: likedBy,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await res.json();

      props.onLikePost(data.post);
    }
  };

  return (
    <div className={classes.post}>
      <div className={classes["post-top"]}>
        <div className={classes["post-info"]}>
          <img src={user.photoUrl || user.photo} alt="avatar" />
          <p>{user.name}</p>
          <p>{calcTimePassed(postedAt)}</p>
        </div>
        <img src={moreIcon} alt="more" />
      </div>

      <div className={classes["post-center"]}>
        <p>{caption}</p>
        {photoUrl && <img src={photoUrl} alt="post" />}
      </div>

      <div className={classes["post-bot"]}>
        <div className={classes["post-count"]}>
          <div>
            <img src={likeCountIcon} alt="like" />
            <p>{likedBy.length} people like this post</p>
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
