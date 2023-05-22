import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../../components/Navigation/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import SearchItem from "../../components/Search/SearchItem";
import { GET_USER_BY_NAME_SERVICE } from "../../service";
import { spinnerActions } from "../../store/Spinner/spinner-state";
import { modalActions } from "../../store/Modal/modal-state";

import classes from "./SearchPage.module.css";
import notFoundIllustration from "../../illustration/not_found.svg";

function SearchPage() {
  const [queryParams] = useSearchParams();
  const { id } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = useState([]);

  const queryValue = queryParams.get("query");

  useEffect(() => {
    const searchRequest = async () => {
      try {
        const res = await fetch(GET_USER_BY_NAME_SERVICE(queryValue));
        const { data } = await res.json();

        setSearchResults(data.users);
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    };

    dispatch(spinnerActions.open());
    searchRequest()
      .then(() => dispatch(spinnerActions.close()))
      .catch(err => {
        dispatch(
          modalActions.open({
            content: err.message,
            type: "error",
          })
        );
        dispatch(spinnerActions.close());
      });
  }, [queryValue, dispatch]);

  const searchItemList = searchResults
    .filter(result => result._id !== id)
    .map(result => <SearchItem key={result._id} userData={result} />);

  const notFoundMsg = (
    <div className={classes["not-found-msg"]}>
      <img src={notFoundIllustration} alt="not-found" />
      <p>We can't find any user with "{queryValue}" keyword</p>
      <p>Please try another keyword.</p>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className={classes.container}>
        <SideBar />

        {searchItemList.length !== 0 && (
          <div className={classes["search-container"]}>
            <p className={classes.title}>Search results:</p>
            {searchItemList}
          </div>
        )}

        {searchItemList.length === 0 && notFoundMsg}
      </div>
    </>
  );
}

export default SearchPage;
