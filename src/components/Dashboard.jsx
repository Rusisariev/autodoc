import React, { useState } from "react";
import { useEffect } from "react";
import axiosSSR from "../axios";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState([]);
    const [superUser, setSuperUser] = useState(false);

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

    const getUser = async () => {
        const res = await axiosSSR
            .get("/api/users/profile/")
            .then((res) => res);
        if (res.data) {
            setSuperUser(res.data.is_superuser);
        }
    };

    useEffect(() => {
        getDashboard();
        if(window.localStorage.getItem("token")){
            getUser();
        }
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-item">
                <h5>К выполнению</h5>
                {dashboard
                    .filter((el) => el.status === "Todo")
                    .map((item) => (
                        <div className="card" key={item.id}>
                            <div className="d-flex flex-column justify-content-between">
                                <p className="mb-0">
                                    {item.buyer_company_name}, {item.seller_company_name}
                                </p>
                                <a href={item.inner_traid} download>
                                    Скачать файл
                                </a>
                            </div>
                            {superUser ? (
                                <div className="d-flex mt-2">
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() =>
                                            patchDashboard(
                                                item.id,
                                                "In progress"
                                            )
                                        }
                                    >
                                        В процессе
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            patchDashboard(item.id, "Done")
                                        }
                                    >
                                        В готово
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    ))}
            </div>
            <div className="dashboard-item">
                <h5>В процессе</h5>
                {dashboard
                    .filter((el) => el.status === "In progress")
                    .map((item) => (
                        <div className="card" key={item.id}>
                            <div className="d-flex flex-column justify-content-between">
                                <p className="mb-0">
                                    {item.buyer_company_name}, {item.seller_company_name}
                                </p>
                                <a href={item.inner_traid} download>
                                    Скачать файл
                                </a>
                            </div>
                            {superUser ? (
                                <div className="d-flex mt-2">
                                     <button
                                        className="btn btn-primary me-2"
                                        onClick={() =>
                                            patchDashboard(item.id, "Todo")
                                        }
                                    >
                                        К выполнению
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            patchDashboard(item.id, "Done")
                                        }
                                    >
                                        В готово
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    ))}
            </div>
            <div className="dashboard-item">
                <h5>Готово</h5>
                {dashboard
                    .filter((el) => el.status === "Done")
                    .map((item) => (
                        <div className="card" key={item.id}>
                            <div className="d-flex flex-column justify-content-between">
                                <p className="mb-0">
                                    {item.buyer_company_name}, {item.seller_company_name}
                                </p>
                                <a href={item.inner_traid} download>
                                    Скачать файл
                                </a>
                            </div>
                            {superUser ? (
                                <div className="d-flex mt-2">
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() =>
                                            patchDashboard(item.id, "Todo")
                                        }
                                    >
                                        К выполнению
                                    </button>
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() =>
                                            patchDashboard(
                                                item.id,
                                                "In progress"
                                            )
                                        }
                                    >
                                        В процессе
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Dashboard;
