import React, { useState } from "react";

import { Users } from "../../dummyData";

import moreIcon from "../../icons/more.svg";
import likeIcon from "../../icons/like.svg";
import likeCountIcon from "../../icons/like_count.svg";
import likeFilledIcon from "../../icons/like_filled.svg";
import commentIcon from "../../icons/comment.svg";
import classes from "./Post.module.css";

function Post(props) {
  const { userId, desc = "", photo, date, like, comment } = props.postData;
  const userPosted = Users.find(user => user.id === userId);

  const [likes, setLikes] = useState(like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLikes(like => {
      if (isLiked) return like - 1;
      else return like + 1;
    });

    setIsLiked(state => !state);
  };

  return (
    <div className={classes.post}>
      <div className={classes["post-top"]}>
        <div className={classes["post-info"]}>
          <img src={userPosted?.profilePicture} alt="avatar" />
          <p>{userPosted?.username}</p>
          <p>{date}</p>
        </div>
        <img src={moreIcon} alt="more" />
      </div>

      <div className={classes["post-center"]}>
        <p>{desc}</p>
        <img src={photo} alt="post" />
      </div>

      <div className={classes["post-bot"]}>
        <div className={classes["post-count"]}>
          <div>
            <img src={likeCountIcon} alt="like" />
            <p>{likes} people like this post</p>
          </div>
          <p>{comment} comments</p>
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
