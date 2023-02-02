import React from "react";
import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/Navigation/NavBar";
import RightBar from "../../components/RightBar/RightBar";
import SideBar from "../../components/SideBar/SideBar";

import classes from "./HomePage.module.css";
import { useSelector } from "react-redux";

function HomePage() {
  const { userList } = useSelector(state => state.user);

  return (
    <>
      <NavBar />
      <div className={classes.container}>
        <SideBar />
        <Feed />
        <RightBar list={userList} />
      </div>
    </>
  );
}

export default HomePage;
