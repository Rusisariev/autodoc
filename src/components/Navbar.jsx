import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../redux/users/action";

const Navbar = () => {
    const location = useLocation()
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    const [links, setLinks] = useState("")
    const [show, setShow] = useState(false)
    const [dropdownToggle, setDropdownToggle] = useState(false)

    const linkList = [
        {
            id: 1,
            title: "Заявка на конвертацию",
            link: "/convertation"
        }, {
            id: 2,
            title: "Форма 2.0",
            link: "/request"
        }, {
            id: 3,
            title: "Доска",
            link: "/dashboard"
        }, {
            id: 4,
            title: "Архив",
            link: "/archive"
        }, {
            id: 5,
            title: "Заказы",
            link: "/order"
        }, {
            id: 6,
            title: "Платежное поручения",
            link: "/payment-order"
        }, {
            id: 7,
            title: "Отчеты",
            link: "/report"
        },
        // {
        //     id: 8,
        //     title: "Закрывающие документы",
        //     link: "/closing-documents"
        // }
    ]

    useEffect(() => {
        dispatch(getUser())
    }, [])

    useEffect(() => {
        setLinks(user.userDetail?.role)
    }, [user.userDetail])

    function showMobileNav() {
        setShow(!show)
        setDropdownToggle(false)
    }

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">
                <div className="navbar-brand">AutoDoc</div>
                <button className="navbar-toggler" type="button" onClick={showMobileNav}>
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className={show ? "collapse navbar-collapse show" : "collapse navbar-collapse"}>
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            links === "Client" ? (
                                <Link
                                    onClick={showMobileNav} to="/user-create-request"
                                    className={location.pathname === "/user-create-request" ? "nav-link active" : "nav-link"}
                                >
                                    Подать заявку
                                </Link>
                            ) : (
                                <>
                                    {
                                        linkList.map(el => (
                                            <Link
                                                onClick={showMobileNav}
                                                to={el.link}
                                                className={location.pathname === el.link ? "nav-link active" : "nav-link"}
                                                key={el.id}
                                            >
                                                {el.title}
                                            </Link>
                                        ))
                                    }
                                    <div className="dropdown">
                                        <a
                                            onClick={() => setDropdownToggle(!dropdownToggle)}
                                            className={location.pathname === "/closing-documents" || location.pathname === "/closing-documents-list" ? "nav-link active dropdown-toggle" : "nav-link dropdown-toggle"}
                                            href="#"
                                        >
                                            Закрывающие документы
                                        </a>

                                        <ul className={dropdownToggle ? "dropdown-menu bg-dark show" : "dropdown-menu"}>
                                            <li>
                                                <Link
                                                    onClick={showMobileNav}
                                                    to="/closing-documents"
                                                    className={"text-white dropdown-item"}
                                                    style={{"--bs-dropdown-link-hover-bg": "rgba(173, 181, 189, 0.5)"}}
                                                >
                                                    Создание
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    onClick={showMobileNav}
                                                    to="/closing-documents-list"
                                                    className={"text-white dropdown-item"}
                                                    style={{"--bs-dropdown-link-hover-bg": "rgba(173, 181, 189, 0.5)"}}
                                                >
                                                    Все
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )
                        }
                    </div>
                    <div className="navbar-nav mb-2 mb-lg-0">
                        <Link
                            onClick={showMobileNav} to="/profile"
                            className={location.pathname === "/profile" ? "btn btn-outline-info active" : "btn btn-outline-info"}
                        >
                            <i className="bi bi-person-circle"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;