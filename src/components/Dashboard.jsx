import React, { useState } from "react";
import { useEffect } from "react";
import axiosSSR from "../axios";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState([]);
    const [superUser, setSuperUser] = useState(false);
    const [modal, setModal] = useState(false);
    const [details, setDetails] = useState(0);
    const [curs, setCurs] = useState({
        internal_course: "",
        client_course: ""
    })
    const navigate = useNavigate()
    const userDetail = useSelector(state => state.user)

    const patchDashboard = async (id, status) => {
        await axiosSSR.patch(`/api/inner_traids_dashboard/${id}/`, {
            status: status,
        });
        getDashboard();
    };

    const getDashboard = async () => {
        const res = await axiosSSR.get("/api/inner_traids_dashboard/");
        setDashboard(res.data);
    };

    const patchStatusUrgent = async (id, urgent) => {
        await axiosSSR.patch(`/api/inner_traids_dashboard/${id}/`, {
            urgent: urgent ? false : true,
        }).then(() => {
            getDashboard();
        })
    };

    const getUser = async () => {
        const res = await axiosSSR
            .get("/api/users/profile/")
            .then((res) => res);
        if (res.data) {
            setSuperUser(res.data.is_superuser);
        }
    };

    const getDetail = async (id) => {
        const res = await axiosSSR.get(`/api/inner_traids_dashboard/${id}`);
        setDetails(res.data);
        setCurs({
            internal_course: res.data.internal_course,
            client_course: res.data?.client_course
        })
    };

    useEffect(() => {
        if(userDetail.userDetail?.role === "Client") {
            navigate("/profile")
        }
    }, [userDetail.userDetail])

    useEffect(() => {
        if(!window.localStorage.getItem("token")){
            navigate("/")
        }else {
            getDashboard();
            getUser();
        }
    }, []);

    const sendArchive = async (id) => {
        const data = {
            is_draft: true
        }
        await axiosSSR.patch(`/api/request/${id}/`, data).then(() => getDashboard())
    }

    function handlerChange(e) {
        const {name, value} = e.target
        setCurs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    async function handlerClick(id) {
        const data = {
            internal_course: curs.internal_course,
            client_course: curs.client_course,
            price: curs.client_course * details?.outgoing_amount
        }
        await axiosSSR.patch(`/api/request/${id}/`, data).then(res => {
            setModal(false)
            return res
        })
    }

    async function sendFile(id) {
        await axiosSSR.patch(`/api/request/${id}/`, {status_gen: true}).then(res => {
            getDetail(id)
            return res
        })
    }

    return (
        <div className="dashboard">
            <div className="dashboard-item bg-warning">
                <h5 className="text-white">К выполнению</h5>
                {dashboard
                    .filter((el) => el.status === "Todo")
                    .sort((a, b) => (a === b)? 0 : a? -1 : 1)
                    .map((item) => (
                        <div
                            className={item.urgent ? "card bg-danger" : "card"}
                            key={item.id}
                            onClick={() => {
                                getDetail(item.id);
                                setModal(true);
                            }}
                            style={item.internal_course || item.client_course ? {} : {background: "#ff0"}}
                        >
                            <div className={item.urgent ? "text-white d-flex flex-column justify-content-between" : "d-flex flex-column justify-content-between"}>
                                <p className="mb-0">
                                    {item.buyer_company_name},{" "}
                                    {item.seller_company_name}
                                </p>
                            </div>
                            {superUser ? (
                                <div>
                                    <div className="d-flex mt-2">
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                patchDashboard(
                                                    item.id,
                                                    "In progress"
                                                );
                                            }}
                                        >
                                            В процессе
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                patchDashboard(item.id, "Done");
                                            }}
                                        >
                                            В готово
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <button
                                            className={!item.urgent ? "btn btn-danger me-2" : "btn btn-primary me-2"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                patchStatusUrgent(item.id, item.urgent);
                                            }}
                                        >
                                            В спешке
                                        </button>
                                        <button
                                            className="btn btn-secondary me-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                sendArchive(item.id);
                                            }}
                                        >
                                            В архив
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ))}
            </div>
            <div className="dashboard-item bg-primary">
                <h5 className="text-white">В процессе</h5>
                {dashboard
                    .filter((el) => el.status === "In progress")
                    .sort((a, b) => (a === b)? 0 : a? -1 : 1)
                    .map((item) => (
                        <div
                            className={item.urgent ? "card bg-danger" : "card"}
                            key={item.id}
                            onClick={() => {
                                getDetail(item.id);
                                setModal(true);
                            }}
                            style={item.internal_course || item.client_course ? {} : {background: "#ff0"}}
                        >
                            <div className={item.urgent ? "text-white d-flex flex-column justify-content-between" : "d-flex flex-column justify-content-between"}>
                                <p className="mb-0">
                                    {item.buyer_company_name},{" "}
                                    {item.seller_company_name}
                                </p>
                            </div>
                            {superUser ? (
                                <div>
                                    <div className="d-flex mt-2">
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                patchDashboard(item.id, "Todo");
                                            }}
                                        >
                                            К выполнению
                                        </button>
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                patchDashboard(item.id, "Done");
                                            }}
                                        >
                                            В готово
                                        </button>
                                    </div>
                                    <div className="mt-2 d-flex">
                                        <button
                                            className={!item.urgent ? "btn btn-danger me-2" : "btn btn-primary me-2"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                patchStatusUrgent(item.id, item.urgent);
                                            }}
                                        >
                                            В спешке
                                        </button>
                                        <button
                                            className="btn btn-secondary me-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                sendArchive(item.id);
                                            }}
                                        >
                                            В архив
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ))}
            </div>
            <div className="dashboard-item bg-success">
                <h5 className="text-white">Готово</h5>
                {dashboard
                    .filter((el) => el.status === "Done")
                    .sort((a, b) => (a === b)? 0 : a? -1 : 1)
                    .map((item) => (
                        <div
                            className="card"
                            key={item.id}
                            onClick={() => {
                                getDetail(item.id);
                                setModal(true);
                            }}
                            style={item.internal_course || item.client_course ? {} : {background: "#ff0"}}
                        >
                            <div className={item.urgent ? "text-white d-flex flex-column justify-content-between" : "d-flex flex-column justify-content-between"}>
                                <p className="mb-0">
                                    {item.buyer_company_name},{" "}
                                    {item.seller_company_name}
                                </p>
                            </div>
                            {superUser ? (
                                <div>
                                    <div className="d-flex mt-2">
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                patchDashboard(item.id, "Todo");
                                            }}
                                        >
                                            К выполнению
                                        </button>
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                patchDashboard(
                                                    item.id,
                                                    "In progress"
                                                );
                                            }}
                                        >
                                            В процессе
                                        </button>
                                    </div>
                                    <div className="d-flex mt-2">
                                        <button
                                            className="btn btn-secondary me-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                sendArchive(item.id);
                                            }}
                                        >
                                            В архив
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ))}
            </div>
            <div
                className="dashboard-modal"
                style={!modal ? { display: "none" } : { display: "flex" }}
                onClick={() => setModal(false)}
            >
                <div
                    className="dashboard-modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p>Номер заказа: {details?.deal_number}</p>
                    <p>Покупатель: {details?.buyer_company_name}</p>
                    <p>Продовец: {details?.seller_company_name}</p>
                    <p>
                        <a href={details?.inner_traid} className="mb-2">
                            Cкачать внутренний трайд
                        </a>
                    </p>
                    <p>
                        <a href={details?.traid} className="mb-2">
                            Cкачать трайд
                        </a>
                    </p>
                    <div className="mb-2">
                        <button className="btn btn-primary" onClick={() => sendFile(details?.id)}>Сгенерировать файлы</button>
                    </div>
                    <div className="send-curs mb-3">
                        <div className="row mt-3 align-items-center">
                            <p className="mb-0 col-4">Клиентский курс:</p>
                            <div className="col-8">
                                <input type="number" step="0.01" className="form-control" name="client_course" value={curs.client_course} onChange={handlerChange} />
                            </div>
                        </div>
                        <div className="row mt-3 align-items-center">
                            <p className="mb-0 col-4">Внутренний курс:</p>
                            <div className="col-8">
                                <input type="number" step="0.01" className="form-control" name="internal_course" value={curs.internal_course} onChange={handlerChange} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end align-items-center mt-2">
                            <button className="btn btn-primary" onClick={() => handlerClick(details?.id)}>Изменить</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="mb-0">
                            Сумма: {details?.price}
                        </p>
                        <p className="mb-0">{details?.date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
