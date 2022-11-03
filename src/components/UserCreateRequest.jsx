import React, {useEffect, useState} from 'react';
import axiosSSR from "../axios";
import {currency} from "./Request";

const UserCreateRequest = () => {
    const [categories, setCategories] = useState([])
    const [userCreateRequest, setUserCreateRequest] = useState({
        category: "",
        price: "",
        date: "",
        product_category: "",
        from_company: "",
        counterparty_bank: "",
        currency: "",
        sell_or_buy: ""
    })
    const [products, setProducts] = useState([])
    const [companies, setCompanies] = useState([])
    const [al, setAl] = useState(false)
    const [error, setError] = useState(false)
    const [newUserCompanyModal, setNewUserCompanyModal] = useState(false)
    const [newUserCompany, setNewUserCompany] = useState({
        name: "",
        director_name: "",
        bank_requisites: "",
        signature: "",
        stamp: "",
        bank_requisites_text: ""
    })

    const handlerChange = (e) => {
        const {name, value} = e.target
        setUserCreateRequest(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const getProducts = async () => {
        const res = await axiosSSR.get("/api/sub_categories/")
        setProducts(res.data)
    }


    const getCategories = async () => {
        const res = await axiosSSR.get("/api/categories/")
        setCategories(res.data)
    }

    const getCompanies = async () => {
        const res = await axiosSSR.get("/api/companies/")
        setCompanies(res.data)
    }

    useEffect(() => {
        getCategories()
        getProducts()
        getCompanies()
    }, [])

    const clearState = () => {
        setUserCreateRequest({
            category: "",
            price: "",
            date: "",
            product_category: "",
            from_company: "",
            counterparty_bank: "",
            currency: "",
            sell_or_buy: ""
        })
    }

    const handlerClick = async () => {
        const data = {
            price: userCreateRequest.price,
            product_or_service: userCreateRequest.category,
            date: userCreateRequest.date,
            product_category: userCreateRequest.product_category,
            from_company: userCreateRequest.from_company,
            counterparty_bank: userCreateRequest.counterparty_bank,
            currency: userCreateRequest.currency,
            sell_or_buy: userCreateRequest.sell_or_buy
        }
        const res = await axiosSSR.post("/api/user_create_request/", data).then((res) => {
            setUserCreateRequest({
                category: "",
                price: "",
                date: "",
                product_category: "",
                from_company: "",
                counterparty_bank: "",
                currency: "",
                sell_or_buy: ""
            })
            if(res?.error?.statusCode === 400){
                setError(true)
                return res
            }
            setAl(true)
        })
    }

    const handlerModalClick = () => {
        setNewUserCompanyModal(!newUserCompanyModal)
    }

    const blobFile = (file) => {
        const blob = new Blob([file], {type: file.type})
        return blob
    }

    const handlerChangeNewUserCompanyFile = (e) => {
        const {name, files} = e.target
        setNewUserCompany(prevState => ({
            ...prevState,
            [name]: blobFile(files[0])
        }))
    }

    const handlerChangeNewUserCompany = (e) => {
        const {name, value} = e.target
        setNewUserCompany(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    console.log(newUserCompany)

    const handlerNewCompanyClick = async () => {
        const data = new FormData

        data.append("name", newUserCompany.name)
        data.append("director_name", newUserCompany.director_name)
        data.append("bank_requisites", newUserCompany.bank_requisites ? newUserCompany.bank_requisites : null)
        data.append("signature", newUserCompany.signature ? newUserCompany.signature : null)
        data.append("stamp", newUserCompany.stamp ? newUserCompany.stamp : null)
        data.append("bank_requisites_text", newUserCompany.bank_requisites_text)

        await axiosSSR.post("/api/new_user_company/", data).then(res => {
            if(!res.error){
                setNewUserCompany({
                    name: "",
                    director_name: "",
                    bank_requisites: "",
                    signature: "",
                    stamp: "",
                    bank_requisites_text: ""
                })
            }
            console.log(res)
        })
    }

    return (
        <div className="user-create-request">
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Цена:</p>
                <div className="col-8">
                    <input type="number" name="price" className="form-control" value={userCreateRequest.price} onChange={handlerChange} />
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Категория:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="category" value={userCreateRequest.category} onChange={handlerChange} required>
                        <option defaultValue>...</option>
                        {
                            categories?.map((item, idx) => (
                                <option value={item.name} key={idx}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Дата:</p>
                <div className="col-8">
                    <input type="date" name="date" className="form-control" value={userCreateRequest.date} onChange={handlerChange} />
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Категория продукта:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="product_category" value={userCreateRequest.product_category} onChange={handlerChange} required>
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
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Компания контрагента:</p>
                <div className="col-8">
                    <div className="row">
                        <div className="col-9">
                            <select className="form-select" aria-label="Default select example" name="from_company" value={userCreateRequest.from_company} onChange={handlerChange} required>
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
                        <div className="col-3">
                            <button className="btn btn-primary w-100" onClick={handlerModalClick}>создать компанию</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Банк контрагента:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="counterparty_bank" value={userCreateRequest.counterparty_bank} onChange={handlerChange} required>
                        <option defaultValue>...</option>
                        {
                            companies?.find(el => el.id === Number(userCreateRequest.from_company))?.banks?.map((item, idx) => (
                                <option key={idx} value={item.id}>{item.company_bank_name_en}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="row mt-3 align-items-center">
                <p className="mb-0 col-4">Валюта:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="currency" value={userCreateRequest.currency} onChange={handlerChange} required>
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
                <p className="mb-0 col-4">Продать или купить:</p>
                <div className="col-8">
                    <select className="form-select" aria-label="Default select example" name="sell_or_buy" value={userCreateRequest.sell_or_buy} onChange={handlerChange} required>
                        <option defaultValue>...</option>
                        <option value="Sell">Sell</option>
                        <option value="Buy">Buy</option>
                    </select>
                </div>
            </div>
            <div className='d-flex justify-content-end mb-5 mt-3 align-items-center'>
                <div>
                    <button className="btn btn-danger me-3" onClick={clearState}>Сбросить</button>
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
            <div className={error ? "alert-custom" : "alert-custom hidden"}>
                <div className="alert alert-danger d-flex align-items-center">
                    <i className="bi bi-exclamation-circle flex-shrink-0 me-2"/>
                    <div>
                        Заполните все поля!!!
                    </div>
                    <button type="button" className="btn-close ms-5" onClick={() => setError(false)}/>
                </div>
            </div>
            <div className={newUserCompanyModal ? "modal-window" : "modal-window hidden"} onClick={handlerModalClick}>
                <div className="modal-window-content container" onClick={event => event.stopPropagation()}>
                    <p className="text-danger">Все поля со звездочкой обезательны для заполнения!</p>
                    <div className="row mt-3 align-items-center">
                        <p className="mb-0 col-4">Название компании * :</p>
                        <div className="col-8">
                            <input type="text" name="name" className="form-control" value={newUserCompany.name} onChange={handlerChangeNewUserCompany} />
                        </div>
                    </div>
                    <div className="row mt-3 align-items-center">
                        <p className="mb-0 col-4">Имя директора * :</p>
                        <div className="col-8">
                            <input type="text" name="director_name" className="form-control" value={newUserCompany.director_name} onChange={handlerChangeNewUserCompany} />
                        </div>
                    </div>
                    <div className="row mt-3 align-items-center">
                        <p className="mb-0 col-4">Подпись:</p>
                        <div className="col-8">
                            <input type="file" name="signature" accept=".docx" className="form-control"  onChange={handlerChangeNewUserCompanyFile} />
                        </div>
                    </div>
                    <div className="row mt-3 align-items-center">
                        <p className="mb-0 col-4">Печать:</p>
                        <div className="col-8">
                            <input type="file" name="stamp" accept=".docx" className="form-control"  onChange={handlerChangeNewUserCompanyFile} />
                        </div>
                    </div>
                    <p className="text-danger mt-2 mb-2">одно из этих полей обезательно к заполнению!</p>
                    <div className="row mt-3 align-items-center">
                        <p className="mb-0 col-4">Банковские реквизиты:</p>
                        <div className="col-8">
                            <input type="file" name="bank_requisites" accept=".docx" className="form-control"  onChange={handlerChangeNewUserCompanyFile} />
                        </div>
                    </div>
                    <div className="row mt-3 align-items-center">
                        <p className="mb-0 col-4">Банковские реквизиты текстом:</p>
                        <div className="col-8">
                            <input type="text" name="bank_requisites_text" className="form-control" value={newUserCompany.bank_requisites_text} onChange={handlerChangeNewUserCompany} />
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end mt-2">
                        <button className="btn btn-primary" onClick={handlerNewCompanyClick}>создать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCreateRequest;