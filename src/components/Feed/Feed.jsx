import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Post from "../Post/Post";
import Share from "../Share/Share";
import { GET_POST_SERVICE, GET_POST_BY_USER_SERVICE } from "../../service";
import { spinnerActions } from "../../store/Spinner/spinner-state";
import { modalActions } from "../../store/Modal/modal-state";

import classes from "./Feed.module.css";
import postIllustration from "../../illustration/post.svg";

function Feed(props) {
  const { id } = useParams();
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);

  const isProfilePage = props.profile;
  const isMyProfile = props.myProfile;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = isProfilePage ? GET_POST_BY_USER_SERVICE(id) : GET_POST_SERVICE;

        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const { data } = await res.json();

        if (!res.ok) throw new Error(data.message);

        setPosts(data.posts);
      } catch (error) {
        throw error;
      }
    };

    dispatch(spinnerActions.open());
    fetchPosts()
      .then(() => dispatch(spinnerActions.close()))
      .catch(() => {
        dispatch(
          modalActions.open({
            content: "Failed to fetch news feed data. Please try again later.",
            type: "error",
          })
        );
        dispatch(spinnerActions.close());
      });
  }, [id, isProfilePage, token, dispatch]);

  const addPostHandler = postData => {
    setPosts(posts => [postData, ...posts]);
  };

  const deletePostHandler = postId => {
    setPosts(posts => posts.filter(post => post._id !== postId));
  };

  const likePostHandler = postData =>
    setPosts(state =>
      state.map(post => {
        if (post._id === postData?._id)
          return {
            ...postData,
            photoUrl: post.photoUrl,
            user: { ...post.user },
          };

        return post;
      })
    );

  const postList = posts.map(post => (
    <Post
      key={post._id}
      postData={post}
      onLikePost={likePostHandler}
      onDeletePost={deletePostHandler}
    />
  ));

  const notFoundMsg = !isProfilePage ? (
    <div className={classes["not-found-msg"]}>
      <img src={postIllustration} alt="post" />
      <p>Wow such empty</p>
      <p>
        Create a new post now to share your interests and connect with others in our
        community
      </p>
    </div>
  ) : null;

  const profileStyle = isProfilePage ? { width: "65%", marginRight: "-3rem" } : {};

  return (
    <div className={classes.feed} style={profileStyle}>
      {(isMyProfile === undefined || isMyProfile === true) && (
        <Share onNewPost={addPostHandler} />
      )}
      {postList.length !== 0 ? postList : notFoundMsg}
    </div>
  );
}

export default Feed;
