import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommentBox from "./CommentBox";
import Comment from "./Comment";
import { GET_COMMENTS_OF_POST, CREATE_COMMENT_SERVICE } from "../../service";
import { spinnerActions } from "../../store/Spinner/spinner-state";
import { modalActions } from "../../store/Modal/modal-state";

import classes from "./CommentSection.module.css";

function CommentSection(props) {
  const { token } = useSelector(state => state.auth);
  const userGlobData = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(GET_COMMENTS_OF_POST(props.post));
        const { data } = await res.json();

        if (!res.ok) throw new Error(data.message);

        setComments(data.comments);
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    };

    dispatch(spinnerActions.open());
    fetchComments()
      .then(() => dispatch(spinnerActions.close()))
      .catch(() => {
        dispatch(
          modalActions.open({
            content: "Failed to fetch comment for this post. Please try again later.",
            type: "error",
          })
        );
        dispatch(spinnerActions.close());
      });
  }, [props.post, dispatch]);

  //? Handler

  const addComment = async commentContent => {
    dispatch(spinnerActions.open());

    try {
      const res = await fetch(CREATE_COMMENT_SERVICE, {
        method: "POST",
        body: JSON.stringify({
          post: props.post,
          content: commentContent,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();

      if (!res.ok) throw new Error(data.message);

      setComments(state => [data.comment, ...state]);
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

  const likeComment = commentData =>
    setComments(state =>
      state.map(comment => {
        if (comment._id === commentData?._id)
          return {
            ...commentData,

            user: { ...comment.user, photoUrl: comment.user.photoUrl },
          };

        return comment;
      })
    );

  //? JSX

  const commentList = comments.map(comment => (
    <Comment
      key={comment._id}
      data={comment}
      user={userGlobData.id}
      onLike={likeComment}
    />
  ));

  return (
    <>
      <hr />
      <div className={classes.comment_section}>
        <CommentBox onNewComment={addComment} />

        {commentList}
      </div>
    </>
  );
}

export default CommentSection;
