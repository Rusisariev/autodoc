import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosSSR from "../axios";

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState("")

    const signInOut = () => {
        window.localStorage.removeItem("token")
        navigate("/")
    }

    const getUser = async () => {
        const res = await axiosSSR.get("/rest-auth/user/")
        setUser(res.data)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            <h2 className="text-uppercase">Autodoc</h2>
            <div>Имя: {user?.username}</div>
            {
                user?.email ? <div>E-mail: {user.email}</div> : null
            }
            {
                user?.first_name ? <div>E-mail: {user.first_name}</div> : null
            }
            {
                user?.last_name ? <div>E-mail: {user.last_name}</div> : null
            }
            <div onClick={signInOut} className="sign-in-out-custom btn btn-danger">Выйти</div>
        </div>
    )
}

export default Profile