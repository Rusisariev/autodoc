import React, {useEffect, useState} from 'react';
import axiosSSR from "../axios";
import Forma20 from "./forma_2_0";

const Order = () => {
    const [order, setOrder] = useState([])
    const [modal, setModal] = useState(null)

    const getArchive = async () => {
        const res = await axiosSSR.get("/api/request/?from_client=true")
        setOrder(res.data)
    }

    useEffect(() => {
        getArchive().then(res => res)
    }, [])
    return (
        <div className="dashboard">
            {
                order?.map((item, idx) => {
                    return (
                        <div key={idx}>
                            <div>
                                <div
                                    className={"card p-2"}
                                    onClick={() => {
                                        setModal(item.id);
                                    }}
                                >
                                    <div className={"d-flex flex-column justify-content-between"}>
                                        <p className="mb-0">
                                            {item.from_company_name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div
                                    className="dashboard-modal"
                                    style={modal !== item.id ? { display: "none" } : { display: "flex", zIndex: 1, padding: "20px" }}
                                    onClick={() => setModal(null)}
                                >
                                    <div
                                        className="dashboard-modal-content"
                                        style={{overflowY: "auto", height: "60%"}}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <p>Номер заказа: {item?.deal_number}</p>
                                        <p>Клиент хочет {item.sell_or_buy === "buy" ? "купить" : "продать"}</p>
                                        <Forma20 content={item} setModal={setModal} getOrder={getArchive} />
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

export default Order;