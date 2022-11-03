import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosSSR from "../axios";
import {useDispatch} from "react-redux";

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
        if(!window.localStorage.getItem("token")){
            navigate("/")
        }else{
            getUser()
        }
    }, [])

    return (
        <div>
            <div className="mt-4">Имя: {user?.username}</div>
            {
                user?.email ? <div className="mt-3">E-mail: {user.email}</div> : null
            }
            {
                user?.first_name ? <div className="mt-3">Имя ползователья: {user.first_name} {user.last_name}</div> : null
            }
            <div className="mt-5 d-flex justify-content-end">
                <div onClick={signInOut} className="sign-in-out-custom btn btn-danger">Выйти</div>
            </div>
        </div>
    )
}

export default Profile