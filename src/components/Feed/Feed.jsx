import React from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";

import { Posts } from "../../dummyData";

import classes from "./Feed.module.css";

function Feed(props) {
  const isProfilePage = props.profile;

  const postList = Posts.map(post => <Post key={post.id} postData={post} />);

  const profileStyle = isProfilePage ? { width: "65%", marginRight: "-3rem" } : {};

  return (
    <div className={classes.feed} style={profileStyle}>
      <Share />
      {postList}
    </div>
  );
}

export default Feed;
