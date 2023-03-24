import React from "react";
import { Navigate } from "react-router";
import MainPage from "../../../pages/MainPage";

const PersistLogin = () => {
    const authUser = localStorage.getItem("user");

    return authUser ? <MainPage /> : <Navigate to="/login" replace />
};

export default PersistLogin;