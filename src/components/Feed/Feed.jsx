import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Post from "../Post/Post";
import Share from "../Share/Share";

import classes from "./Feed.module.css";

function Feed(props) {
  const postState = useSelector(state => state.post);
  const { id } = useParams();

  const isProfilePage = props.profile;
  const isMyProfile = props.myView;

  const reverseList = [];
  postState.postList.forEach(ele => {
    reverseList.unshift(ele);
  });
  const postList = isProfilePage
    ? reverseList.filter(post => post.userId === +id).map(post => <Post key={post.id} postData={post} />)
    : reverseList.map(post => <Post key={post.id} postData={post} />);

  const profileStyle = isProfilePage ? { width: "65%", marginRight: "-3rem" } : {};

  return (
    <div className={classes.feed} style={profileStyle}>
      {(isMyProfile === undefined || isMyProfile === true) && <Share />}
      {postList}
    </div>
  );
}

export default Feed;
