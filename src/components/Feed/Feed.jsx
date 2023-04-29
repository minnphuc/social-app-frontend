import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Post from "../Post/Post";
import Share from "../Share/Share";
import { POST_SERVICE } from "../../service";

import classes from "./Feed.module.css";

function Feed(props) {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(POST_SERVICE);
        const { data } = await res.json();

        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  const addPostHandler = postData => {
    setPosts(posts => [...posts, postData]);
  };

  const likePostHandler = postData => {
    setPosts(posts =>
      posts.map(ele => {
        if (ele._id === postData._id)
          return {
            ...postData,
            photoUrl: ele.photoUrl,
            user: { ...ele.user, photoUrl: ele.user.photoUrl },
          };

        return ele;
      })
    );
  };

  const isProfilePage = props.profile;
  const isMyProfile = props.myProfile;

  const reverseList = [];
  posts.forEach(ele => {
    reverseList.unshift(ele);
  });

  const postList = isProfilePage
    ? reverseList
        .filter(post => post.user._id === id)
        .map(post => <Post key={post._id} postData={post} onLikePost={likePostHandler} />)
    : reverseList.map(post => <Post key={post._id} postData={post} onLikePost={likePostHandler} />);

  const profileStyle = isProfilePage ? { width: "65%", marginRight: "-3rem" } : {};

  return (
    <div className={classes.feed} style={profileStyle}>
      {(isMyProfile === undefined || isMyProfile === true) && <Share onNewPost={addPostHandler} />}
      {postList}
    </div>
  );
}

export default Feed;
