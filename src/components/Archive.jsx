import React, {useEffect, useState} from 'react';
import axiosSSR from "../axios";

const Archive = () => {
    const [archive, setArchive] = useState([])
    const [modal, setModal] = useState(null)

    const getArchive = async () => {
        const res = await axiosSSR.get("/api/request/?is_draft=true")
        setArchive(res.data)
    }

    console.log(archive)

    useEffect(() => {
        getArchive().then(res => res)
    }, [])

    return (
        <div className="dashboard">
            {
                archive?.map((item, idx) => {
                    return (
                        <>
                            <div
                                className={"card"}
                                key={item.id}
                                onClick={() => {
                                    // getDetail(item.id);
                                    setModal(idx);
                                }}
                            >
                                <div className={"d-flex flex-column justify-content-between"}>
                                    <p className="mb-0">
                                        {item.buyer_company_name},{" "}
                                        {item.seller_company_name}
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
                                            Cкачать файл
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
                        </>
                    )
                })
            }
        </div>
    );
};

export default Archive;