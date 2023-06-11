import React, {useEffect, useState} from 'react';
import Select from "../UI/Select";
import {currency} from "../Request";
import MultiSelect from "../UI/MultiSelect";
import axiosSSR from "../../axios";

const ClosingDocumentsCreate = () => {
    const [closingDocument, setClosingDocument] = useState({
        applications: [],
        shipper: 0,
        consignee: 0,
        payer: 0,
        seller: 0,
        currency: "",
        driver: 0,
        ttn_upd_number: "",
        ttn_upd_date: "",
        contract_number: "",
        contract_date: "",
        application_type: "",
        application_date: "",
        application_number: ""
    })
    const [paymentOrder, setPaymentOrder] = useState([])
    const [resultApplications, setResultApplications] = useState([])
    const [search, setSearch] = useState({
        shipper: false,
        consignee: false,
        payer: false,
        seller: false,
    })
    const [searchValue, setSearchValue] = useState("")
    const [allCompanies, setAllCompanies] = useState([])
    const [error, setError] = useState(false)
    const [al, setAl] = useState(false)
    const [driver, setDriver] = useState([])

    useEffect(() => {
        fetchPaymentOrder().then(r => r)
        fetchAllCompanies({}).then(r => r)
        fetchDriver().then(r => r)
    }, [])

    useEffect(() => {
        fetchAllCompanies({search: searchValue}).then(r => r)
    }, [searchValue])

    const fetchPaymentOrder = async () => {
        await axiosSSR.get("/api/payment_order/").then(res => {
            setPaymentOrder(res.data)
        })
    }

    const fetchAllCompanies = async (query) => {
        await axiosSSR.get("/api/all_companies/", {params: query}).then(res => {
            setAllCompanies(res.data)
        })
    }

    const fetchDriver = async () => {
        await axiosSSR.get("/api/drivers/").then(res => {
            setDriver(res.data)
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setClosingDocument(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlerClickMultiSelect = (el) => {
        const arr = [...resultApplications]
        if (arr.findIndex(item => el.id === item.id) === -1) {
            arr.push(el)
        } else {
            arr.splice(arr.findIndex(item => el.id === item.id), 1)
        }
        setResultApplications(arr)
        handleChange({target: {name: "applications", value: arr.map(el => el.id)}})
    }

    const handleSearch = (name) => {
        const defaultState = {
            shipper: false,
            consignee: false,
            payer: false,
            seller: false
        }
        setSearch({...defaultState, [name]: !search[name]})
    }

    const handleSearchReset = () => {
        const defaultState = {
            shipper: false,
            consignee: false,
            payer: false,
            seller: false
        }
        setSearch(defaultState)
    }

    const clearState = () => {
        setClosingDocument({
            applications: [],
            shipper: 0,
            consignee: 0,
            payer: 0,
            seller: 0,
            currency: "",
            driver: 0,
            ttn_upd_number: "",
            ttn_upd_date: "",
            contract_number: "",
            contract_date: "",
            application_type: "",
            application_date: "",
            application_number: ""
        })
        setResultApplications([])
    }

    const handlerClick = async (e) => {
        e.preventDefault()

        const data = {
            ...closingDocument,
            shipper: closingDocument.shipper.id,
            consignee: closingDocument.consignee.id,
            payer: closingDocument.payer.id,
            seller: closingDocument.seller.id
        }

        await axiosSSR.post("/api/transport_request/", data).then(res => {
            setAl(true)
            clearState()

            setTimeout(() => {
                setAl(false)
            }, 3000)
        }).catch(err => {
            setError(true)
        })
    }

    return (
        <div>

            <form onSubmit={handlerClick} >
                <MultiSelect
                    name={"applications"}
                    options={paymentOrder}
                    onClick={handlerClickMultiSelect}
                    className={""}
                    headerTitle={"Приложения:"}
                    valueResult={resultApplications}
                />

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">грузоотправитель:</p>
                    <div className="col-8">
                        <div className="custom-select h-100">
                            <div className="d-flex form-control h-100" onClick={() => handleSearch("shipper")}>{closingDocument.shipper ? closingDocument.shipper.company_short_name_en : "..."}</div>
                            <div className="my-list" style={search.shipper ? {display: "block"} : {}}>
                            <span className="d-block p-2">
                                <input type="text" className="form-control" placeholder="Поиск" name="shipper"
                                       value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                            </span>
                                {
                                    allCompanies.map((item, idx) => (
                                        <div key={idx} onClick={() => {
                                            handleChange({target: {name: "shipper", value: item}})
                                            handleSearchReset()
                                        }}>
                                            {item.company_short_name_en}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">грузополучатель:</p>
                    <div className="col-8">
                        <div className="custom-select h-100">
                            <div className="d-flex form-control h-100"
                                 onClick={() => handleSearch("consignee")}>{closingDocument.consignee ? closingDocument.consignee.company_short_name_en : "..."}</div>
                            <div className="my-list" style={search.consignee ? {display: "block"} : {}}>
                            <span className="d-block p-2">
                                <input type="text" className="form-control" placeholder="Поиск" name="consignee"
                                       value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                            </span>
                                {
                                    allCompanies.map((item, idx) => (
                                        <div key={idx} onClick={() => {
                                            handleChange({target: {name: "consignee", value: item}})
                                            handleSearchReset()
                                        }}>
                                            {item.company_short_name_en}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">плательщик:</p>
                    <div className="col-8">
                        <div className="custom-select h-100">
                            <div className="d-flex form-control h-100" onClick={() => handleSearch("payer")}>{closingDocument.payer ? closingDocument.payer.company_short_name_en : "..."}</div>
                            <div className="my-list" style={search.payer ? {display: "block"} : {}}>
                            <span className="d-block p-2">
                                <input type="text" className="form-control" placeholder="Поиск" name="payer"
                                       value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                            </span>
                                {
                                    allCompanies.map((item, idx) => (
                                        <div key={idx} onClick={() => {
                                            handleChange({target: {name: "payer", value: item}})
                                            handleSearchReset()
                                        }}>
                                            {item.company_short_name_en}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">продавец:</p>
                    <div className="col-8">
                        <div className="custom-select h-100">
                            <div className="d-flex form-control h-100" onClick={() => handleSearch("seller")}>
                                {closingDocument.seller ? closingDocument.seller.company_short_name_en : "..."}
                            </div>
                            <div className="my-list" style={search.seller ? {display: "block"} : {}}>
                            <span className="d-block p-2">
                                <input type="text" className="form-control" placeholder="Поиск" name="seller"
                                       value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                            </span>
                                {
                                    allCompanies.map((item, idx) => (
                                        <div key={idx} onClick={() => {
                                            handleChange({target: {name: "seller", value: item}})
                                            handleSearchReset()
                                        }}>
                                            {item.company_short_name_en}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <Select
                    value={closingDocument.currency}
                    onChange={handleChange}
                    title={"Валюта:"}
                    currency={currency}
                    name={"currency"}
                />

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Номер УПД/ТТН:</p>
                    <div className="col-8">
                        <input type="text" className="form-control" value={closingDocument.ttn_upd_number}
                               name="ttn_upd_number"
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Дата УПД/ТТН:</p>
                    <div className="col-8">
                        <input type="date" className="form-control" value={closingDocument.ttn_upd_date} name="ttn_upd_date"
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Номер контракта:</p>
                    <div className="col-8">
                        <input type="text" className="form-control" value={closingDocument.contract_number}
                               name="contract_number"
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Дата контракта:</p>
                    <div className="col-8">
                        <input type="date" className="form-control" value={closingDocument.contract_date}
                               name="contract_date"
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Тип приложения:</p>
                    <div className="col-8">
                        <select name="application_type" className="form-select" onChange={handleChange} value={closingDocument.application_type}>
                            <option defaultValue>...</option>
                            <option value="Приложение">Приложение</option>
                            <option value="Инвойс">Инвойс</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Дата приложения:</p>
                    <div className="col-8">
                        <input type="date" className="form-control" value={closingDocument.application_date}
                               name="application_date"
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Номер приложения:</p>
                    <div className="col-8">
                        <input type="text" className="form-control" value={closingDocument.application_number}
                               name="application_number"
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Водитель:</p>
                    <div className="col-8">
                        <select name="driver" className="form-select" value={closingDocument.driver} onChange={handleChange}>
                            <option defaultValue>...</option>
                            {
                                driver.map((el, idx) => (
                                    <option key={idx} value={el.id}>{el.tractor_mark} - {el.driver_first_name} {el.driver_last_name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className='d-flex justify-content-between mb-5 mt-3 align-items-center'>
                    <div>
                        {/*{*/}
                        {/*    docx ? <a href={docx.traid} download>Скачать документ</a> : null*/}
                        {/*}*/}
                    </div>
                    <div>
                        <button className="btn btn-danger me-3" onClick={clearState}>Сбросить</button>
                        <button className="btn btn-primary" type="submit">Отправить</button>
                    </div>
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

        </div>
    );
};

export default ClosingDocumentsCreate;