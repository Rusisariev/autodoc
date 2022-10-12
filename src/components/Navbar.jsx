import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
    const [show, setShow] = useState(false)
    const location = useLocation()

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
                        <Link onClick={showMobileNav} to="/inner-traids" className={location.pathname === "/inner-traids" ? "nav-link active" : "nav-link"}>Внутренние сделки</Link>
                        <Link onClick={showMobileNav} to="/convertation" className={location.pathname === "/convertation" ? "nav-link active" : "nav-link"} >Заявка на конвертацию</Link>
                        <Link onClick={showMobileNav} to="/request" className={location.pathname === "/request" ? "nav-link active" : "nav-link"}>Форма 2.0</Link>
                        <Link onClick={showMobileNav} to="/dashboard" className={location.pathname === "/dashboard" ? "nav-link active" : "nav-link"}>Приборная доска</Link>
                    </div>
                    <div className="navbar-nav mb-2 mb-lg-0">
                        <Link onClick={showMobileNav} to="/profile" className={location.pathname === "/profile" ? "nav-link active" : "nav-link"} >Профиль</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;