import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import RecommendItem from "./RecommendItem";
import { GET_RECOMMEND_USERS_SERVICE } from "../../service";

import classes from "./RecommendUser.module.css";

function RecommendUser() {
  const { token } = useSelector(state => state.auth);

  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    const fetchRecommendUsers = async () => {
      try {
        const res = await fetch(GET_RECOMMEND_USERS_SERVICE, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const { data } = await res.json();

        setRecommend(data.recommend);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendUsers();
  }, [token]);

  const recommendList = recommend.map(user => (
    <RecommendItem key={user._id} userData={user} />
  ));

  return (
    <div className={classes.container}>
      <p className={classes.title}>People you may know:</p>
      {recommendList}
    </div>
  );
}

export default RecommendUser;
