import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Convertation from "./components/Convertation";
import Navbar from "./components/Navbar";
import Request from "./components/Request";

const App = (props) => {
    return (
        <>
            <Navbar/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/convertation" element={<Convertation/>}/>
                    <Route path="/request" element={<Request/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </>
    );
};

export default App;
