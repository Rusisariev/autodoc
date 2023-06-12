import React, {useEffect, useMemo, useState} from 'react';
import Select from "./UI/Select";
import {banks} from "./Request";
import axiosSSR from "../axios";

const Report = () => {
    const [state, setState] = useState({
        date_from: "",
        date_to: "",
        bank: "",
        user: ""
    })
    const [success, setSuccess] = useState("")
    const [userSearchValue, setUserSearchValue] = useState("")
    const [userSearch, setUserSearch] = useState(false)
    const [user, setUser] = useState([])

    useEffect(() => {
        getUsers().then(r => r)
    }, [])

    const getUsers = async () => {
        const res = await axiosSSR.get("/api/companies/")
        setUser(res.data)
    }

    const handlerChange = (e) => {
        const {name, value} = e.target
        setState(prevState => ({...prevState, [name]: value}))
    }

    const clearState = () => {
        setState({
            date_from: "",
            date_to: "",
            bank: "",
            user: ""
        })
        setSuccess("")
    }

    const sendClick = async () => {
        const res = await axiosSSR.get(`/api/report/get_report/`, {
            params: {
                date_from: state.date_from,
                date_to: state.date_to,
                bank: state.bank,
                user: state.user.first_name
            }
        })
        setSuccess(res.data)
    }

    const newUserArray = useMemo(() => {
        return user?.filter(el => el.role === "Client")?.filter(el => el.first_name.toLowerCase().includes(userSearchValue.toLowerCase()))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSearchValue])

    return (
        <div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Дата от:</p>
                <div className="col-8">
                    <input type="date" className="form-control" value={state.date_from} name="date_from"
                           onChange={handlerChange}/>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Дата до:</p>
                <div className="col-8">
                    <input type="date" className="form-control" value={state.date_to} name="date_to"
                           onChange={handlerChange}/>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Пользователь:</p>
                <div className="col-8">
                    <div className="custom-select h-100">
                        <div className="d-flex form-control h-100"
                             onClick={() => setUserSearch(!userSearch)}>{state.user ? state.user.first_name : "..."}</div>
                        <div className="my-list" style={userSearch ? {display: "block"} : {}}>
                            <span className="d-block p-2">
                                <input className="form-control" value={userSearchValue} placeholder="Поиск"
                                       onChange={(e) => setUserSearchValue(e.target.value)}/>
                            </span>
                            <div onClick={() => {
                                handlerChange({target: {name: "user", value: ""}})
                                setUserSearch(!userSearch)
                                setUserSearchValue("")
                            }}>...</div>
                            {
                                (newUserArray?.length ? newUserArray : user)?.filter(el => el.role === "Client")?.map((item, idx) => (
                                    <div key={idx} onClick={() => {
                                        handlerChange({target: {name: "user", value: item}})
                                        setUserSearch(!userSearch)
                                        setUserSearchValue("")
                                    }}>
                                        {item.first_name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Select
                value={state.bank}
                onChange={handlerChange}
                title={"Название банка:"}
                currency={banks}
                name={"bank"}
            />
            <div className='d-flex justify-content-between mb-5 mt-3 align-items-center'>
                <div>
                    {success ? <a href={success}>Скачать отчет</a> : null}
                </div>
                <div>
                    <button className="btn btn-danger me-3" onClick={clearState}>Сбросить</button>
                    <button className="btn btn-primary" onClick={sendClick}>Отправить</button>
                </div>
            </div>
        </div>
    );
};

export default Report;
