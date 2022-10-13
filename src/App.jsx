import React from "react";
import {Link, Route, Routes, useLocation} from "react-router-dom";
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
                location.pathname !== "/" ? <Navbar /> : <div className="d-flex justify-content-end container position-absolute mt-3">
                    <Link to="/dashboard" className={location.pathname === "/dashboard" ? "nav-link active" : "nav-link"}>Доска</Link>
                </div>
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
