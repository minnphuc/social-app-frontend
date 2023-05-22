import React from "react";

import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/Navigation/NavBar";
import RightBar from "../../components/RightBar/RightBar";
import SideBar from "../../components/SideBar/SideBar";

import classes from "./HomePage.module.css";

function HomePage() {
  return (
    <>
      <NavBar />
      <div className={classes.container}>
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
}

export default HomePage;
