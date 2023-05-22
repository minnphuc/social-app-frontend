import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CommentSection from "../Comment/CommentSection";
import { UPDATE_POST_SERVICE, COUNT_COMMENTS_OF_POST } from "../../service";
import calcTimePassed from "../../utils/calcTimePassed";
import likeUtil from "../../utils/likeUtils";

import moreIcon from "../../icons/more.svg";
import likeIcon from "../../icons/like.svg";
import likeCountIcon from "../../icons/like_count.svg";
import likeFilledIcon from "../../icons/like_filled.svg";
import commentIcon from "../../icons/comment.svg";

import classes from "./Post.module.css";

function Post(props) {
  const userGlobData = useSelector(state => state.user);
  const { token } = useSelector(state => state.auth);

  const [commentIsOpen, setCommentIsOpen] = useState(false);
  const [commentCount, setCommentCount] = useState();

  const { _id: id, user, caption, photoUrl, postedAt, likedBy } = props.postData;

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const res = await fetch(COUNT_COMMENTS_OF_POST(id));
        const { data } = await res.json();

        if (!res.ok) throw new Error(data.message);

        setCommentCount(data.count);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCommentCount();
  }, [id]);

  const isLiked = likedBy.some(id => id === userGlobData.id);

  const toggleCommentSection = () => {
    setCommentIsOpen(state => !state);
  };

  const likeHandler = async () => {
    try {
      const data = await likeUtil(
        token,
        likedBy,
        userGlobData.id,
        UPDATE_POST_SERVICE(id)
      );
      // Updated post with new LikedBy
      props.onLikePost(data.post);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={classes.post}>
      <div className={classes["post-top"]}>
        <div className={classes["post-info"]}>
          <img src={user.photoUrl || user.photo} alt="avatar" />
          <Link to={`/profile/${user._id}`}>{user.name}</Link>
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

          <button onClick={toggleCommentSection}>
            <img src={commentIcon} alt="comment" />
            Comments
          </button>
        </div>
      </div>

      {commentIsOpen && <CommentSection post={id} />}
    </div>
  );
}

export default Post;
