import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axiosSSR from "../axios";
import { currency } from "./Request";

const Traids = () => {
    const [traidsState, setTraidsState] = useState({
        date: "",
        deal_number: 0,
        mode: "",
        incoming_currency: "",
        incoming_amount: 0,
        client_course: 0,
        outgoing_currency: "",
        internal_course: 0,
        outgoing_amount: 0,
        client: "",
        counterparty_company_bank_name: "",
        our_company_name: ""
    })
    const [companies, setCompanies] = useState([])
    const [al, setAl] = useState(false)
    const [error, setError] = useState(false)
    const [docx, setDocx] = useState(false)

    const getCompanies = async () => {
        const res = await axiosSSR.get("/api/companies/")
        setCompanies(res.data)
    }

    useEffect(() => {
        getCompanies()
    }, [])

    useEffect(() => {
        setTraidsState(prevState => ({
            ...prevState,
            counterparty_company_bank_name: ""
        }))
    }, [traidsState.client])

    const handlerChange = (e) => {
        const {name, value} = e.target
        setTraidsState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const clearState = () => {
        setTraidsState({
            date: "",
            deal_number: 0,
            mode: "",
            incoming_currency: "",
            incoming_amount: 0,
            client_course: 0,
            outgoing_currency: "",
            internal_course: 0,
            outgoing_amount: 0,
            client: "",
            counterparty_company_bank_name: "",
            our_company_name: ""
        })
    }

    const handlerClick = async () => {
        const data = {
            date: traidsState.date,
            deal_number: traidsState.deal_number,
            mode: traidsState.mode,
            incoming_currency: traidsState.incoming_currency,
            incoming_amount: traidsState.incoming_amount,
            client_course: traidsState.client_course,
            outgoing_currency: traidsState.outgoing_currency,
            internal_course: traidsState.internal_course,
            outgoing_amount: traidsState.outgoing_amount,
            client: traidsState.client,
            counterparty_company_bank_name: traidsState.counterparty_company_bank_name,
            our_company_name: traidsState.our_company_name
        }
        const doc = await axiosSSR.post("/api/traids/", data).then(res => {
            setTraidsState({
                date: "",
                deal_number: 0,
                mode: "",
                incoming_currency: "",
                incoming_amount: 0,
                client_course: 0,
                outgoing_currency: "",
                internal_course: 0,
                outgoing_amount: 0,
                client: "",
                counterparty_company_bank_name: "",
                our_company_name: ""
            })
            if(res?.error?.statusCode === 400){
                setError(true)
                return res
            }
            setAl(true)
            return res
        })
        setDocx(doc.data)
    }
    return (
        <>
            <div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Дата:</p>
                    <div className="col-8">
                        <input type="date" className="form-control" name="date" value={traidsState.date} onChange={handlerChange}/>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Номер сделки:</p>
                    <div className="col-8">
                        <input type="number" className="form-control" name="deal_number" value={traidsState.deal_number} onChange={handlerChange}/>
                    </div>
                </div>    
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Режим:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="mode" value={traidsState.mode} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            <option value="Bank client">Bank client</option>
                            <option value="Operator">Operator</option>
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Входящая валюта:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="incoming_currency" value={traidsState.incoming_currency} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                currency.map((item, idx) => {
                                    return (
                                        <option value={item.meaning} key={idx}>{item.title}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Входящая сумма:</p>
                    <div className="col-8">
                        <input type="number" className="form-control" name="incoming_amount" value={traidsState.incoming_amount} onChange={handlerChange}/>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Клиентский курс:</p>
                    <div className="col-8">
                        <input type="number" className="form-control" name="client_course" value={traidsState.client_course} onChange={handlerChange}/>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Исходящая валюта:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="outgoing_currency" value={traidsState.outgoing_currency} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                currency.map((item, idx) => {
                                    return (
                                        <option value={item.meaning} key={idx}>{item.title}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Внутренний курс:</p>
                    <div className="col-8">
                        <input type="number" className="form-control" name="internal_course" value={traidsState.internal_course} onChange={handlerChange}/>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Исходящая сумма:</p>
                    <div className="col-8">
                        <input type="number" className="form-control" name="outgoing_amount" value={traidsState.outgoing_amount} onChange={handlerChange}/>
                    </div>
                </div>
                <div className="row mt-3 align-items-center"> 
                    <p className="mb-0 col-4">Клиент:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="client" value={traidsState.client} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                companies?.map((item, idx) => (
                                    <option value={item.id} key={idx}>
                                        {item.company_short_name_en}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Название банка компании-контрагента:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="counterparty_company_bank_name" value={traidsState.counterparty_company_bank_name} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                companies?.find(el => el.id === Number(traidsState.client))?.banks?.map((item, idx) => (
                                    <option key={idx} value={item.id}>{item.company_bank_name_en}</option>
                                ))
                                // companies.map((item, idx) => {
                                //     return item.banks.map((element, idx) => {
                                //         return <option key={idx} value={element.id}>{item.company_short_name_en}, {element.company_bank_name_en}</option>
                                //     })
                                // })
                            }
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center"> 
                    <p className="mb-0 col-4">Название нашей компании:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="our_company_name" value={traidsState.our_company_name} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                companies?.map((item, idx) => (
                                    <option value={item.id} key={idx}>
                                        {item.company_short_name_en}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-5 mt-3 align-items-center">
                    <div>
                        {
                            docx ? <a href={docx.traid} download>Скачать документ</a> : null
                        }
                    </div>
                    <div>
                        <button className="btn btn-danger me-3" onClick={clearState}>Сбросить</button>
                        <button className="btn btn-primary" onClick={handlerClick}>Отправить</button>
                    </div>
                </div>
            </div>
            <div className={al ? "alert-custom" : "alert-custom hidden"}>
                <div className="alert alert-success d-flex align-items-center">
                    <i className="bi bi-exclamation-circle flex-shrink-0 me-2"/>
                    <div>
                        Успешно!!!
                    </div>
                    <button type="button" className="btn-close ms-5" onClick={() => setAl(false)}/>
                </div>
            </div>
            <div className={error ? "alert-custom" : "alert-custom hidden"}>
                <div className="alert alert-danger d-flex align-items-center">
                    <i className="bi bi-exclamation-circle flex-shrink-0 me-2"/>
                    <div>
                        Заполните все поля!!!
                    </div>
                    <button type="button" className="btn-close ms-5" onClick={() => setError(false)}/>
                </div>
            </div>
        </>
    )
}

export default Traids