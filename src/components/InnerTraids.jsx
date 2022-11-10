import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosSSR from "../axios";
import { currency } from "./Request";
import {useSelector} from "react-redux";

const InnerTraids = () => {
    const navigate = useNavigate()
    const [innerTraidsState, setInnerTraidsState] = useState({
        date: "",
        deal_number: 0,
        currency: "",
        amount_of_payment: 0,
        buyer_name: "",
        buyer_bank_name: "",
        seller_name: "",
        seller_bank_name: "",
        category: "",
        product: ""
    })
    const [companies, setCompanies] = useState([])
    const [al, setAl] = useState(false)
    const [error, setError] = useState(false)
    const [docx, setDocx] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const userDetail = useSelector(state => state.user)

    const getCompanies = async () => {
        const res = await axiosSSR.get("/api/companies/")
        setCompanies(res.data)
    }

    const getProducts = async () => {
        const res = await axiosSSR.get("/api/products/")
        setProducts(res.data)
    }

    const getCategories = async () => {
        const res = await axiosSSR.get("/api/categories/")
        setCategories(res.data)
    }

    useEffect(() => {
        if(userDetail.userDetail?.role === "Client") {
            navigate("/profile")
        }
    }, [userDetail.userDetail])

    useEffect(() => {
        if(!window.localStorage.getItem("token")){
            navigate("/")
        }else{
            getCompanies()
            getProducts()
            getCategories()
        }
    }, [])

    useEffect(() => {
       setInnerTraidsState(prevState => ({
           ...prevState,
           buyer_bank_name: ""
       }))
    }, [innerTraidsState.buyer_name])

    useEffect(() => {
        setInnerTraidsState(prevState => ({
            ...prevState,
            seller_bank_name: ""
        }))
    }, [innerTraidsState.seller_name])

    const handlerChange = (e) => {
        const {name, value} = e.target
        setInnerTraidsState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const clearState = () => {
        setInnerTraidsState({
            date: "",
            deal_number: 0,
            currency: "",
            amount_of_payment: 0,
            buyer_name: "",
            buyer_bank_name: "",
            seller_name: "",
            seller_bank_name: "",
            category: "",
            product: ""
        })
    }

    const handlerClick = async () => {
        const data = {
            date: innerTraidsState.date,
            deal_number: innerTraidsState.deal_number,
            currency: innerTraidsState.currency,
            amount_of_payment: innerTraidsState.amount_of_payment,
            buyer_name: innerTraidsState.buyer_name,
            buyer_bank_name: innerTraidsState.buyer_bank_name,
            seller_name: innerTraidsState.seller_name,
            seller_bank_name: innerTraidsState.seller_bank_name,
            category: innerTraidsState.category,
            product: innerTraidsState.product
        }
        const doc = await axiosSSR.post("/api/inner_traids/", data).then(res => {
            setInnerTraidsState({
                date: "",
                deal_number: 0,
                currency: "",
                amount_of_payment: 0,
                buyer_name: "",
                buyer_bank_name: "",
                seller_name: "",
                seller_bank_name: "",
                category: "",
                product: ""
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
                        <input type="date" className="form-control" name="date" value={innerTraidsState.date} onChange={handlerChange}/>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Номер сделки:</p>
                    <div className="col-8">
                        <input type="number" className="form-control" name="deal_number" value={innerTraidsState.deal_number} onChange={handlerChange}/>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Валюта:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="currency" value={innerTraidsState.currency} onChange={handlerChange} required>
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
                    <p className="mb-0 col-4">Сумма платежа:</p>
                    <div className="col-8">
                        <input type="number" className="form-control" name="amount_of_payment" value={innerTraidsState.amount_of_payment} onChange={handlerChange}/>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Имя покупателя:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="buyer_name" value={innerTraidsState.buyer_name} onChange={handlerChange} required>
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
                    <p className="mb-0 col-4">Название банка покупателя:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="buyer_bank_name" value={innerTraidsState.buyer_bank_name} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                companies?.find(el => el.id === Number(innerTraidsState.buyer_name))?.banks?.map((item, idx) => (
                                    <option key={idx} value={item.id}>{item.company_bank_name_en}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Имя продавца:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="seller_name" value={innerTraidsState.seller_name} onChange={handlerChange} required>
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
                    <p className="mb-0 col-4">Название банка покупателя:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="seller_bank_name" value={innerTraidsState.seller_bank_name} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                companies?.find(el => el.id === Number(innerTraidsState.seller_name))?.banks?.map((item, idx) => (
                                    <option key={idx} value={item.id}>{item.company_bank_name_en}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Категория:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="category" value={innerTraidsState.category} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                categories?.map((item, idx) => (
                                    <option value={item.id} key={idx}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Товар:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="product" value={innerTraidsState.product} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                products?.map((item, idx) => (
                                    <option value={item.id} key={idx}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-5 mt-3 align-items-center">
                    <div>
                        {
                            docx ? <a href={docx.inner_traid} download>Скачать документ</a> : null
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

export default InnerTraids