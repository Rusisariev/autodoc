import React, { useState } from "react";
import { useEffect } from "react";
import axiosSSR from "../axios";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState([]);

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

    useEffect(() => {
        getDashboard();
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-item">
                <h5>К выполнению</h5>
                {dashboard
                    .filter((el) => el.status === "Todo")
                    .map((item) => (
                        <div className="card" key={item.id}>
                            <div className="d-flex justify-content-between">
                                <p>
                                    {item.deal_number}, {item.date}
                                </p>
                                <a href={item.inner_traid} download>
                                    Скачать файл
                                </a>
                            </div>
                            <div className="d-flex">
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() =>
                                        patchDashboard(item.id, "In progress")
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
                        </div>
                    ))}
            </div>
            <div className="dashboard-item">
                <h5>В процесе</h5>
                {dashboard
                    .filter((el) => el.status === "In progress")
                    .map((item) => (
                        <div className="card" key={item.id}>
                            <div className="d-flex justify-content-between">
                                <p>
                                    {item.deal_number}, {item.date}
                                </p>
                                <a href={item.inner_traid} download>
                                    Скачать файл
                                </a>
                            </div>
                            <div className="d-flex">
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        patchDashboard(item.id, "Done")
                                    }
                                >
                                    В готово
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="dashboard-item">
                <h5>Готово</h5>
                {dashboard
                    .filter((el) => el.status === "Done")
                    .map((item) => (
                        <div className="card" key={item.id}>
                            <div className="d-flex justify-content-between">
                                <p>
                                    {item.deal_number}, {item.date}
                                </p>
                                <a href={item.inner_traid} download>
                                    Скачать файл
                                </a>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Dashboard;
