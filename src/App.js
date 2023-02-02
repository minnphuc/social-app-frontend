import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import HomePage from "./pages/Home/HomePage";
import AuthPage from "./pages/Auth/AuthPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Modal from "./components/UI/Modal/Modal";
import { loginWithStoredToken } from "./store/Auth/auth-action";
import { getAllUser, getCurrentUser } from "./store/User/user-action";

import "./App.css";
import { getAllPost } from "./store/Post/post-action";

function App() {
  const { isLogin, userId } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // Different useEffect for good reason
  useEffect(() => {
    dispatch(loginWithStoredToken());
    dispatch(getAllUser());
    dispatch(getAllPost());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrentUser(userId));
  }, [userId, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/auth" />} />

        <Route path="/auth" element={!isLogin ? <AuthPage /> : <Navigate replace to="/home" />} />
        <Route path="/home" element={isLogin ? <HomePage /> : <Navigate replace to="/auth" />} />
        <Route path="/profile/:id" element={isLogin ? <ProfilePage /> : <Navigate replace to="/auth" />} />
      </Routes>

      <Modal />
    </>
  );
}

export default App;
