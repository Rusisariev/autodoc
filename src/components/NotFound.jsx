import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="d-flex align-items-center vh-100 justify-content-center">
            <div className="d-grid align-items-center">
                <p className="h1 me-1 text-center">404</p> 
                <div className="d-flex">
                    Нет такой страницы:
                    <div className="ms-1">
                        <Link to="/" >На главную</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound