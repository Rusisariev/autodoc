import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Convertation from "./components/Convertation";
import Request from "./components/Request";
import Navbar from "./components/Navbar"
import InnerTraids from "./components/InnerTraids";
import Dashboard from "./components/Dashboard";

const App = () => {
    const location = useLocation()
    return (
        <>
            {
                location.pathname !== "/" ? <Navbar /> : null
            }
            <div className="container">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/convertation" element={<Convertation/>}/>
                    <Route path="/request" element={<Request/>}/>
                    <Route path="/inner-traids" element={<InnerTraids/>} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </>
    );
};

export default App;
