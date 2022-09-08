import React, {useEffect, useState} from 'react';
import {currency} from "./Request";
import axiosSSR from "../axios";

const Convertation = () => {
    const [companies, setCompanies] = useState([])
    const [convertationState, setConvertationState] = useState({
        date: "",
        number: 0,
        incoming_currency: "",
        incoming_amount: 0,
        internal_course: 0,
        outgoing_currency: "",
        outgoing_amount: 0,
        client_course: 0,
        our_company_name: 0,
        our_company_bank_name: 0
    })
    const [docx, setDocx] = useState(false)
    const [al, setAl] = useState(false)

    const handlerChange = (e) => {
        const {name, value} = e.target
        setConvertationState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const getCompanies = async () => {
        const res = await axiosSSR.get("/api/companies/")
        setCompanies(res.data)
    }

    useEffect(() => {
        getCompanies()
    }, [])

    const clearConvertationState = () => {
        setConvertationState({
            date: "",
            number: 0,
            incoming_currency: "",
            incoming_amount: 0,
            internal_course: 0,
            outgoing_currency: "",
            outgoing_amount: 0,
            client_course: 0,
            our_company_name: 0,
            our_company_bank_name: 0
        })
    }

    const handlerClick = async () => {
        const data = {
            date: convertationState.date,
            number: +convertationState.number,
            incoming_currency: convertationState.incoming_currency,
            incoming_amount: +convertationState.incoming_amount,
            internal_course: +convertationState.internal_course,
            outgoing_currency: convertationState.outgoing_currency,
            outgoing_amount: +convertationState.outgoing_amount,
            client_course: convertationState.client_course,
            our_company_name: +convertationState.our_company_name,
            our_company_bank_name: +convertationState.our_company_bank_name
        }
        const doc = await axiosSSR.post("/api/convertations/", data).then(res => {
            setConvertationState({
                date: "",
                number: 0,
                incoming_currency: "",
                incoming_amount: 0,
                internal_course: 0,
                outgoing_currency: "",
                outgoing_amount: 0,
                client_course: 0,
                our_company_name: 0,
                our_company_bank_name: 0
            })
            setAl(true)
            return res
        })
        setDocx(doc.data)
    }
    return (
        <div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Дата:</p>
                <div className="col-8">
                    <input type="date" className="form-control" name="date" value={convertationState.date} onChange={handlerChange}/>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Номер:</p>
                <div className="col-8">
                    <input type="number" className="form-control" name="number" value={convertationState.number} onChange={handlerChange}/>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Входящая валюта:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="incoming_currency" value={convertationState.incoming_currency} onChange={handlerChange} required>
                        <option defaultValue>...</option>
                        {
                            currency.map((item, idx) => {
                                return <option value={item.title} key={idx}>{item.title}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Входящая сумма:</p>
                <div className="col-8">
                    <input type="number" className="form-control" name="incoming_amount" value={convertationState.incoming_amount} onChange={handlerChange}/>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Внутренний курс:</p>
                <div className="col-8">
                    <input type="number" className="form-control" name="internal_course" value={convertationState.internal_course} onChange={handlerChange}/>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Исходящая валюта:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="outgoing_currency" value={convertationState.outgoing_currency} onChange={handlerChange} required>
                        <option defaultValue>...</option>
                        {
                            currency.map((item, idx) => {
                                return <option value={item.title} key={idx}>{item.title}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Исходящая сумма:</p>
                <div className="col-8">
                    <input type="number" className="form-control" name="outgoing_amount" value={convertationState.outgoing_amount} onChange={handlerChange}/>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Клиентский курс:</p>
                <div className="col-8">
                    <input type="number" className="form-control" name="client_course" value={convertationState.client_course} onChange={handlerChange}/>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Название нашей компании:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="our_company_name" value={convertationState.our_company_name} onChange={handlerChange} required>
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
                <p className="mb-0 col-4">Название банка нашей компании:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="our_company_bank_name" value={convertationState.our_company_bank_name} onChange={handlerChange} required>
                        <option defaultValue>...</option>
                        {
                            companies?.filter(el => el.id === Number(convertationState.our_company_name))[0]?.banks?.map((item, idx) => (
                                <option key={idx} value={item.id}>{item.company_bank_name_en}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="d-flex justify-content-between mb-5 mt-3 align-items-center">
                <div>
                    {
                        docx ? <a className="link-dark" href={docx.convertation} download>Скачать документ</a> : null
                    }
                </div>
                <div>
                    <button className="btn btn-danger me-3" onClick={clearConvertationState}>Сбросить</button>
                    <button className="btn btn-primary" onClick={handlerClick}>Отправить</button>
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
        </div>
    );
};

export default Convertation;