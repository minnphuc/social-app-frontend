import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loginWithStoredToken } from "./store/Auth/auth-action";
import { getAllUser } from "./store/User/user-action";

import HomePage from "./pages/Home/HomePage";
import AuthPage from "./pages/Auth/AuthPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Modal from "./components/UI/Modal/Modal";

import "./App.css";
import SpinKit from "./components/UI/Spinkit/SpinKit";

function App() {
  const { isLogin } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithStoredToken());
    dispatch(getAllUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/auth" />} />

        <Route path="/auth" element={!isLogin ? <AuthPage /> : <Navigate replace to="/home" />} />
        <Route path="/home" element={isLogin ? <HomePage /> : <Navigate replace to="/auth" />} />
        <Route
          path="/profile/:id"
          element={isLogin ? <ProfilePage /> : <Navigate replace to="/auth" />}
        />
      </Routes>

      <Modal />
      <SpinKit />
    </>
  );
}

export default App;
