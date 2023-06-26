import React from "react";
import { useNavigate } from "react-router-dom";

import RecommendUser from "./RecommendUser";

import feedIcon from "../../icons/feed.svg";
import chatIcon from "../../icons/chat_sidebar.svg";
import videoIcon from "../../icons/video.svg";
import groupIcon from "../../icons/group.svg";
import bookmarkIcon from "../../icons/bookmark.svg";
import questionIcon from "../../icons/question.svg";
import jobIcon from "../../icons/job.svg";
import eventIcon from "../../icons/event.svg";
import courseIcon from "../../icons/job.svg";
import classes from "./SideBar.module.css";

function SideBar() {
  const navigate = useNavigate();

  const openChat = () => navigate("/messenger");

  return (
    <div className={classes.sidebar}>
      <ul className={classes["sidebar-list"]}>
        <li>
          <img src={feedIcon} alt="feed" />
          Feed
        </li>

        <li onClick={openChat}>
          <img src={chatIcon} alt="chat" />
          Chat
        </li>

        <li>
          <img src={videoIcon} alt="video" />
          Videos
        </li>

        <li>
          <img src={groupIcon} alt="group" />
          Groups
        </li>

        <li>
          <img src={bookmarkIcon} alt="bookmark" />
          Bookmarks
        </li>

        <li>
          <img src={questionIcon} alt="question" />
          Questions
        </li>

        <li>
          <img src={jobIcon} alt="job" />
          Jobs
        </li>

        <li>
          <img src={eventIcon} alt="event" />
          Events
        </li>

        <li>
          <img src={courseIcon} alt="course" />
          Courses
        </li>
      </ul>
      <hr />
      <RecommendUser />
    </div>
  );
}

export default SideBar;
