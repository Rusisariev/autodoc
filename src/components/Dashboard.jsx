import React, { useState } from "react";
import { useEffect } from "react";
import axiosSSR from "../axios";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState([]);
    const [superUser, setSuperUser] = useState(false);
    const [modal, setModal] = useState(false);
    const [details, setDetails] = useState(0);

    const patchDashboard = async (id, status) => {
        const res = await axiosSSR.patch(`/api/inner_traids_dashboard/${id}/`, {
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
    };

    useEffect(() => {
        getDashboard();
        if (window.localStorage.getItem("token")) {
            getUser();
        }
    }, []);

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
                                            className={!item.urgent ? "btn btn-danger" : "btn btn-primary"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                patchStatusUrgent(item.id, item.urgent);
                                            }}
                                        >
                                            В спешке
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
                                    <div className="mt-2">
                                        <button
                                            className={!item.urgent ? "btn btn-danger" : "btn btn-primary"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                patchStatusUrgent(item.id, item.urgent);
                                            }}
                                        >
                                            В спешке
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
                        >
                            <div className={item.urgent ? "text-white d-flex flex-column justify-content-between" : "d-flex flex-column justify-content-between"}>
                                <p className="mb-0">
                                    {item.buyer_company_name},{" "}
                                    {item.seller_company_name}
                                </p>
                            </div>
                            {superUser ? (
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
                            Cкачать файл
                        </a>
                    </p>
                    <div className="d-flex justify-content-between">
                        <p className="mb-0">
                            Сумма: {details?.amount_of_payment}
                        </p>
                        <p className="mb-0">{details?.date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
