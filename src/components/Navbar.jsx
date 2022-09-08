import React, {useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    const [path, setPath] = useState("")
    const [show, setShow] = useState(false)
    useEffect(() => {
        setPath(window.location.pathname)
    }, [window.location.pathname])

    function showMobileNav() {
        setShow(!show)
    }

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="navbar-brand" to="/">AutoDoc</div>
                <button className="navbar-toggler" type="button" onClick={showMobileNav}>
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className={show ? "collapse navbar-collapse show" : "collapse navbar-collapse"}>
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link onClick={showMobileNav} to="/profile" className={path === "/profile" ? "nav-link active" : "nav-link"} >Профиль</Link>
                        <Link onClick={showMobileNav} to="/convertation" className={path === "/convertation" ? "nav-link active" : "nav-link"} >Конвертация</Link>
                        <Link onClick={showMobileNav} to="/request" className={path === "/request" ? "nav-link active" : "nav-link"}>Заявка</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;