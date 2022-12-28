import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Pages
import LoginPage from '../Pages/Login/index'
import RegisterPage from "../Pages/Register";
import DashboardPage from '../Pages/Dashboard'


export default function WebRoutes(){
    return(
        <Router>
            <Routes>
                <Route path="/login" exact element={<LoginPage/>} />
                <Route path="/register" exact element={<RegisterPage/>} />
                <Route path="/dashboard" exact element={<DashboardPage/>} />
            </Routes>
        </ Router>
    )
}