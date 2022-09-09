import React, {useEffect, useState} from 'react';
import axios from "axios";
import axiosSSR from "../axios";

export const currency = [
    {
        title: "USD",
        meaning: "USD",
    }, {
        title: "EURO",
        meaning: "EURO",
    }, {
        title: "RUB",
        meaning: "RUB",
    }, {
        title: "CNY",
        meaning: "CNY",
    }, {
        title: "SOM",
        meaning: "KG",
    }
]

const Request = () => {
    const [requestState, setRequestState] = useState({
        currency: "",
        price: 0,
        productOrService: "",
        sellOrBuy: "",
        ourCompany: "",
        bankOfOurCompany: "",
        counterPartyCompany: "",
        counterPartyBank: "",
        productCategory: "",
        status: true
    })
    const [companies, setCompanies] = useState([])
    const [products, setProducts] = useState([])
    const [al, setAl] = useState(false)
    const [error, setError] = useState(false)

    const handlerChange = (e) => {
        const {name, value} = e.target
        setRequestState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const getCompanies = async () => {
        const res = await axiosSSR.get("/api/companies/")
        setCompanies(res.data)
    }

    const getProducts = async () => {
        const res = await axiosSSR.get("/api/products/")
        setProducts(res.data)
    }

    useEffect(() => {
        getCompanies()
        getProducts()
    }, [])

    const handlerClick = async (e) => {
        e.preventDefault()
        const data = {
            currency: requestState.currency,
            price: requestState.price,
            product_or_service: requestState.productOrService,
            sell_or_buy: requestState.sellOrBuy,
            status: requestState.status,
            to_company: +requestState.ourCompany,
            bank: +requestState.bankOfOurCompany,
            from_company: +requestState.counterPartyCompany,
            counterparty_bank: +requestState.counterPartyBank,
            product_category: +requestState.productCategory
        }
        await axiosSSR.post("/api/request/", data).then(res => {
            setRequestState({
                currency: "",
                price: 0,
                productOrService: "",
                sellOrBuy: "",
                ourCompany: "",
                bankOfOurCompany: "",
                counterPartyCompany: "",
                counterPartyBank: "",
                productCategory: "",
                status: true
            })
            if(res?.error?.statusCode === 400){
                setError(true)
                return res
            }
            setAl(true)
            return res
        })
    }

    const clearState = (e) => {
        e.preventDefault()
        setRequestState({
            currency: "",
            price: 0,
            productOrService: "",
            sellOrBuy: "",
            ourCompany: "",
            bankOfOurCompany: "",
            counterPartyCompany: "",
            counterPartyBank: "",
            productCategory: "",
            status: true
        })
    }

    return (
        <>
            <form onSubmit={handlerClick}>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Валюта:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="currency" value={requestState.currency} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                currency.map((item, idx) => {
                                    return <option value={item.meaning} key={idx}>{item.title}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Цена:</p>
                    <div className="col-8">
                        <input type="number" className="form-control" min="0" name="price" value={requestState.price} onChange={handlerChange} required/>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Товар или услуга:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="productOrService" value={requestState.productOrService} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            <option value="Product">Product</option>
                            <option value="Service">Service</option>
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Продать или купить:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="sellOrBuy" value={requestState.sellOrBuy} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            <option value="Sell">Sell</option>
                            <option value="Buy">Buy</option>
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Наша компания:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="ourCompany" value={requestState.ourCompany} onChange={handlerChange} required>
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
                    <p className="mb-0 col-4">Банк нашей компании:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="bankOfOurCompany" value={requestState.bankOfOurCompany} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                companies?.find(el => el.id === Number(requestState.ourCompany))?.banks?.map((item, idx) => (
                                    <option key={idx} value={item.id}>{item.company_bank_name_en}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Компания контрагента:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="counterPartyCompany" value={requestState.counterPartyCompany} onChange={handlerChange} required>
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
                    <p className="mb-0 col-4">Банк контрагента:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="counterPartyBank" value={requestState.counterPartyBank} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                companies?.find(el => el.id === Number(requestState.counterPartyCompany))?.banks?.map((item, idx) => (
                                    <option key={idx} value={item.id}>{item.company_bank_name_en}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Категория продукта:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="productCategory" value={requestState.productCategory} onChange={handlerChange} required>
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
                <div className='d-flex justify-content-end mb-5 mt-3 align-items-center'>
                    <button className="btn btn-danger me-3" onClick={clearState}>Сбросить</button>
                    <button className="btn btn-primary" type="submit">Отправить</button>
                </div>
            </form>
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
};

export default Request;