import React, {useEffect, useState} from 'react';
import axiosSSR from "../axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Archive = () => {
    const [archive, setArchive] = useState([])
    const [modal, setModal] = useState(null)
    const userDetail = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(userDetail.userDetail?.role === "Client") {
            navigate("/profile")
        }
    }, [userDetail.userDetail])

    const getArchive = async () => {
        const res = await axiosSSR.get("/api/request/?is_draft=true")
        setArchive(res.data)
    }

    useEffect(() => {
        if(!window.localStorage.getItem("token")){
            navigate("/")
        }else{
            getArchive().then(res => res)
        }
    }, [])

    return (
        <div className="dashboard mt-3">
            {
                archive?.map((item, idx) => {
                    return (
                        <div key={idx}>
                            <div
                                className={"card"}
                                onClick={() => {
                                    // getDetail(item.id);
                                    setModal(item.id);
                                }}
                            >
                                <div className={"d-flex flex-column justify-content-between"}>
                                    <p className="mb-0">
                                        {item.from_company_name}
                                        </p>
                                </div>
                            </div>
                            <div
                                className="dashboard-modal"
                                style={!modal ? { display: "none" } : { display: "flex" }}
                                onClick={() => setModal(null)}
                            >
                                <div
                                    className="dashboard-modal-content"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <p>Номер заказа: {item?.deal_number}</p>
                                    <p>Покупатель: {item?.buyer_company_name}</p>
                                    <p>Продовец: {item?.seller_company_name}</p>
                                    <p>
                                        <a href={item?.inner_traid} className="mb-2">
                                            Cкачать внутренний трайд
                                        </a>
                                    </p>
                                    <p>
                                        <a href={item?.traid} className="mb-2">
                                            Cкачать трайд
                                        </a>
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-0">
                                            Сумма: {item?.price}
                                        </p>
                                        <p className="mb-0">{item?.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Archive;