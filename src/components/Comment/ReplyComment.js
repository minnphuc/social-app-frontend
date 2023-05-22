import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import CommentBox from "./CommentBox";
import calcTimePassed from "../../utils/calcTimePassed";
import likeUtil from "../../utils/likeUtils";
import { UPDATE_REPLY_SERVICE, CREATE_REPLY_SERVICE } from "../../service";
import { spinnerActions } from "../../store/Spinner/spinner-state";
import { modalActions } from "../../store/Modal/modal-state";

import classes from "./Comment.module.css";
import replyIcon from "../../icons/reply.svg";
import likeIcon from "../../icons/like.svg";
import likeFilledIcon from "../../icons/like_filled.svg";

function ReplyComment(props) {
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [boxOpen, setBoxOpen] = useState(false);

  const { _id: id, comment, user, replyTo, content, likedBy, postedAt } = props.data;

  const isLiked = likedBy.some(id => id === props.user);

  const likeHandler = async () => {
    try {
      const data = await likeUtil(token, likedBy, props.user, UPDATE_REPLY_SERVICE(id));
      props.onLike(data.reply);
    } catch (error) {
      console.error(error.message);
    }
  };

  const showReplyBox = () => setBoxOpen(true);

  const addReply = async replyContent => {
    dispatch(spinnerActions.open());

    try {
      const res = await fetch(CREATE_REPLY_SERVICE, {
        method: "POST",
        body: JSON.stringify({
          comment,
          replyTo: user._id,
          content: replyContent,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();

      if (!res.ok) throw new Error(data.message);

      setBoxOpen(false);
      props.onNewReply(data.reply);
    } catch (error) {
      dispatch(
        modalActions.open({
          content: error.message,
          type: "error",
        })
      );
    }

    dispatch(spinnerActions.close());
  };

  return (
    <>
      <div className={classes.reply_comment}>
        <div className={classes.vote}>
          <p className="num_vote">{likedBy.length}</p>
          <div onClick={likeHandler}>
            <img src={isLiked ? likeFilledIcon : likeIcon} alt="like" />
          </div>
        </div>

        <div className={classes.comment_content}>
          <div className={classes.info_reply}>
            <img
              className={classes.avatar}
              src={user.photoUrl || user.photo}
              alt="avatar"
            />

            <Link to={`/profile/${user._id}`} className={classes.name}>
              {user.name}
            </Link>
            <p className={classes.date}>{calcTimePassed(postedAt)}</p>

            <p onClick={showReplyBox} className={classes.reply_btn}>
              <img src={replyIcon} alt="reply" />
              <span>Reply</span>
            </p>
          </div>

          <div className={classes.content}>
            <span className={classes.reply_name}>@{`${replyTo.name} `}</span>
            {content}
          </div>
        </div>
      </div>
      {boxOpen && <CommentBox onNewComment={addReply} replyTo={user.name} />}
    </>
  );
}

export default ReplyComment;
