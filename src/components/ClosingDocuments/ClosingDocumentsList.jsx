import React, {useEffect, useState} from 'react';
import axiosSSR from "../../axios";

const ClosingDocumentsList = () => {
    const [closingList, setClosingList] = useState([])
    const [modal, setModal] = useState(null)

    useEffect(() => {
        fetchClosingDocumentList().then(r => r)
    }, [])

    const fetchClosingDocumentList = async () => {
        await axiosSSR.get("/api/transport_request/").then(res => {
            setClosingList(res.data)
        })
    }

    console.log(closingList);

    return (
        <div className="dashboard mt-3">
            {
                closingList?.map((item, idx) => {
                    return (
                        <div key={idx}>
                            <div
                                className="card p-3 my-2 mx-2"
                                onClick={() => {
                                    setModal(item.id);
                                }}
                            >
                                <div className={"d-flex flex-column justify-content-between"}>
                                    <p className="mb-0">
                                        {item.contract_number}
                                    </p>
                                </div>
                            </div>
                            <div
                                className="dashboard-modal"
                                style={modal !== item.id ? { display: "none" } : { display: "flex" }}
                                onClick={() => setModal(null)}
                            >
                                <div
                                    className="dashboard-modal-content"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <p>
                                        <a href={item?.transport_request_doc} className="mb-2">
                                            transport_request_doc
                                        </a>
                                    </p>
                                    <p>
                                        <a href={item?.ttn_doc} className="mb-2">
                                            ttn_doc
                                        </a>
                                    </p>
                                    <p>
                                        <a href={item?.upd_doc} className="mb-2">
                                            ttn_doc
                                        </a>
                                    </p>
                                    <p>
                                        <a href={item?.dover_doc} className="mb-2">
                                            dover_doc
                                        </a>
                                    </p>
                                    <p>
                                        <a href={item?.packing_list_doc} className="mb-2">
                                            packing_list_doc
                                        </a>
                                    </p>
                                    <p>
                                        Дата:
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default ClosingDocumentsList;