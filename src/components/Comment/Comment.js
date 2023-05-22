import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import CommentBox from "./CommentBox";
import ReplyComment from "./ReplyComment";
import calcTimePassed from "../../utils/calcTimePassed";
import {
  UPDATE_COMMENT_SERVICE,
  GET_REPLIES_OF_COMMENT,
  CREATE_REPLY_SERVICE,
  COUNT_REPLIES_OF_COMMENT,
} from "../../service";
import { spinnerActions } from "../../store/Spinner/spinner-state";
import { modalActions } from "../../store/Modal/modal-state";
import likeUtil from "../../utils/likeUtils";

import classes from "./Comment.module.css";
import replyIcon from "../../icons/reply.svg";
import expandIcon from "../../icons/expand.svg";
import likeIcon from "../../icons/like.svg";
import likeFilledIcon from "../../icons/like_filled.svg";

function Comment(props) {
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [replies, setReplies] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [replyCount, setReplyCount] = useState();

  const { _id: id, user, content, postedAt, likedBy } = props.data;

  const isLiked = likedBy.some(id => id === props.user);

  useEffect(() => {
    const fetchReplyCount = async () => {
      try {
        const res = await fetch(COUNT_REPLIES_OF_COMMENT(id));
        const { data } = await res.json();

        if (!res.ok) throw new Error(data.message);

        setReplyCount(data.count);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchReplyCount();
  }, [id]);

  const showReplies = async () => {
    dispatch(spinnerActions.open());

    try {
      const res = await fetch(GET_REPLIES_OF_COMMENT(id));
      const { data } = await res.json();

      if (!res.ok) throw new Error(data.message);

      setReplies(data.replies);
    } catch (error) {
      dispatch(
        modalActions.open({
          content: "Failed to fetch replies for this comment. Please try again later.",
          type: "error",
        })
      );
    }

    dispatch(spinnerActions.close());
    setIsShow(true);
  };

  const showReplyBox = () => {
    setBoxOpen(true);
    showReplies();
  };

  const likeHandler = async () => {
    try {
      const data = await likeUtil(token, likedBy, props.user, UPDATE_COMMENT_SERVICE(id));
      // Updated comment with new likedBy
      props.onLike(data.comment);
    } catch (error) {
      console.error(error.message);
    }
  };

  const likeReply = replyData =>
    setReplies(state =>
      state.map(reply => {
        if (reply._id === replyData?._id)
          return {
            ...replyData,
            user: { ...reply.user, photoUrl: reply.user.photoUrl },
          };

        return reply;
      })
    );

  const newReplyHandler = newReply => setReplies(state => [...state, newReply]);

  const addReply = async replyContent => {
    dispatch(spinnerActions.open());

    try {
      const res = await fetch(CREATE_REPLY_SERVICE, {
        method: "POST",
        body: JSON.stringify({
          comment: id,
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
      newReplyHandler(data.reply);
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

  //? JSX
  const replyList = replies.map(reply => (
    <ReplyComment
      key={reply._id}
      data={reply}
      user={props.user}
      onLike={likeReply}
      onNewReply={newReplyHandler}
    />
  ));

  return (
    <>
      <div className={classes.comment}>
        <div className={classes.vote}>
          <p className="num_vote">{likedBy.length}</p>
          <div onClick={likeHandler}>
            <img src={isLiked ? likeFilledIcon : likeIcon} alt="like" />
          </div>
        </div>

        <div className={classes.comment_content}>
          <div className={classes.info}>
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

          <div className={classes.content}>{content}</div>

          {replyCount !== 0 && !isShow && (
            <div className={classes.show_btn}>
              <div onClick={showReplies}>
                <img src={expandIcon} alt="show" />
                <p>Show {replyCount} replies</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {boxOpen && <CommentBox onNewComment={addReply} replyTo={user.name} />}
      {isShow && replyList}
    </>
  );
}

export default Comment;
