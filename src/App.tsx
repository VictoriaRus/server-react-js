import React from 'react';
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PersistLogin from "./components/common-components/PersistLogin/PersistLogin";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={ <Navigate replace to="/login"/> }/>
            <Route path="/login" element={ <LoginPage /> }/>
            <Route path="/registration" element={ <RegistrationPage /> }/>
            <Route element={ <PersistLogin /> }>
                <Route path="/main" element={ <MainPage /> }/>
            </Route>
        </Routes>
    );
}
export default App;
