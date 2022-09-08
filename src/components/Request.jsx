import React, {useEffect, useState} from 'react';
import axios from "axios";
import axiosSSR from "../axios";

const currency = [
    {
        title: "USD"
    }, {
        title: "EURO"
    }, {
        title: "RUB"
    }, {
        title: "CNY"
    }, {
        title: "KG"
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
    const [companiesBank, setCompaniesBank] = useState(0)

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

    useEffect(() => {
        getCompanies()
    }, [])

    return (
        <div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Валюта:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="currency" onChange={handlerChange}>
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
                <p className="mb-0 col-4">Цена:</p>
                <div className="col-8">
                    <input type="number" className="form-control" min="0" name="price" onChange={handlerChange}/>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Товар или услуга:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="productOrService" onChange={handlerChange}>
                        <option defaultValue>...</option>
                        <option value="Product">Product</option>
                        <option value="service">Service</option>
                    </select>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Продать или купить:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="sellOrBuy" onChange={handlerChange}>
                        <option defaultValue>...</option>
                        <option value="Sell">Sell</option>
                        <option value="Buy">Buy</option>
                    </select>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Наша компания:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="ourCompany" onChange={handlerChange}>
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
                    <select className="form-select" aria-label="Default select example" name="bankOfOurCompany" onChange={handlerChange}>
                        <option defaultValue>...</option>
                        {
                            companies.filter(el => el.id === Number(requestState.ourCompany))[0]?.banks?.map((item, idx) => (
                                <option key={idx} value={item.id}>{item.company_bank_name_en}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Компания контрагента:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="counterPartyCompany" onChange={handlerChange}>
                        <option defaultValue>...</option>
                    </select>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Банк контрагента:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="counterPartyBank" onChange={handlerChange}>
                        <option defaultValue>...</option>
                    </select>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Категория продукта:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="productCategory" onChange={handlerChange}>
                        <option defaultValue>...</option>
                    </select>
                </div>
            </div>
        </div>
)
    ;
};

export default Request;