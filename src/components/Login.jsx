import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosSSR from "../axios/index"

const Login = () => {
    const navigate = useNavigate();
    const [singIn, setSignIn] = useState({
        username: "",
        password: ""
    });
    const [passwordHidden, setPasswordHidden] = useState(false)
    const [error, setError] = useState(null)

    const handlerChange = (e) => {
        const {name, value} = e.target
        setSignIn(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        if(window.localStorage.getItem("token")){
            navigate('/profile')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: singIn.username,
            password: singIn.password
        }

        await axiosSSR.post("/rest-auth/login/", data).then((res) => {
            window.localStorage.setItem("token", res.data.key)
            setSignIn({
                username: "",
                password: ""
            })
            navigate('/profile')
        }).catch(e => {
            console.log(e)
            setError(e)
        })
    }

    const hidden = (e) => {
        e.preventDefault()
        setPasswordHidden(!passwordHidden)
    }

    return (
        <>
            <div className="sign-in">
                <div className="form-sign-in m-auto">
                    <form onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 fw-normal text-white text-center">Авторизация</h1>
                        {
                            error ? (
                                <p className="text-danger">Неправильное имя пользователя или же пароль!</p>
                            ) : null
                        }
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className={error ? "form-control is-invalid" : "form-control"}
                                id="floatingUsername"
                                name="username"
                                autoComplete="username"
                                placeholder="username"
                                value={singIn.username}
                                onChange={handlerChange}
                            />
                            <label htmlFor="floatingUsername">Имя пользователя</label>
                        </div>
                        <div className="input-group mb-3">
                            <div className="form-floating">
                                <input
                                    type={passwordHidden ? "text" : "password"}
                                    className={error ? "form-control is-invalid" : "form-control"}
                                    id="floatingPassword"
                                    placeholder="Password"
                                    name="password"
                                    value={singIn.password}
                                    onChange={handlerChange}
                                    autoComplete="current-password"
                                    style={{borderRight: "1px solid transparent"}}
                                />
                                <label htmlFor="floatingPassword">Пароль</label>
                            </div>
                            <div
                                className={
                                    error
                                        ? "input-group-text btn btn-primary bg-light text-muted border-danger d-flex justify-content-center align-items-center"
                                        : "input-group-text btn btn-primary bg-light text-muted border-light d-flex justify-content-center align-items-center"
                                }
                                onClick={hidden}
                                style={{borderLeft: "1px solid transparent"}}
                            >
                                {
                                    !passwordHidden
                                        ? <i className="bi bi-eye-fill"/>
                                        : <i className="bi bi-eye-slash-fill"/>
                                }
                            </div>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
                    </form>
                </div>
            </div>
        </>
    )
}


export default Login
