import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosSSR from "../axios";
import CustomSelect from "./CustomSelect";
import {useSelector} from "react-redux";
import Select from "./UI/Select";

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

export const banks = [
    {
        meaning: "РСК банк",
        title: "РСК банк",
    }, {
        meaning: "Бакай банк",
        title: "Бакай банк",
    }, {
        meaning: "ЕСБ банк",
        title: "ЕСБ банк",
    }, {
        meaning: "Айыл банк",
        title: "Айыл банк",
    }, {
        meaning: "Керемет банк",
        title: "Керемет банк",
    }
]

export const transactionTypes = [
    {
        meaning: "Cashed out",
        title: "Cashed out",
    }, {
        meaning: "Transit",
        title: "Transit",
    }, {
        meaning: "Transit-convertation",
        title: "Transit-convertation",
    }
]

const Request = () => {
    const navigate = useNavigate()
    const [requestState, setRequestState] = useState({
        user: "",
        bank_name: "",
        currency: "",
        price: 0,
        product_or_service: "",
        sell_or_buy: "",
        status_gen: false,
        date: "",
        deal_number: 0,
        mode: "",
        client_course: 0.00,
        outgoing_currency: "",
        internal_course: 0.00,
        outgoing_amount: 0,
        to_company: 0,
        bank: 0,
        from_company: 0,
        counterparty_bank: "",
        product_category: "",
        product: "",
        transaction_type: ""
    })
    const [companies, setCompanies] = useState([])
    const [user, setUser] = useState([])
    const [products, setProducts] = useState([])
    const [al, setAl] = useState(false)
    const [error, setError] = useState(false)
    const [docx, setDocx] = useState(false)
    const [products2, setProducts2] = useState([])
    const [userSearchValue, setUserSearchValue] = useState("")
    const [userSearch, setUserSearch] = useState(false)
    const [fromCompanySearchValue, setFromCompanySearchValue] = useState("")
    const [fromCompanySearch, setFromCompanySearch] = useState(false)

    const userDetail = useSelector(state => state.user)

    const newUserArray = useMemo(() => {
        return user.filter(el => el.username.toLowerCase().includes(userSearchValue.toLowerCase()))
    }, [userSearchValue])

    const newFromCompanyArray = useMemo(() => {
        return user?.find(el => el.id === Number(requestState?.user?.id))?.companies.filter(el => el.company_full_name_ru.toLowerCase().includes(fromCompanySearchValue.toLowerCase()))
    }, [fromCompanySearchValue])

    const handlerChange = (e) => {
        const {name, value} = e.target
        setRequestState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const getCompanies = async () => {
        const res = await axiosSSR.get("/api/our_companies/")
        setCompanies(res.data)
    }

    const getProducts = async () => {
        const res = await axiosSSR.get("/api/sub_categories/")
        setProducts(res.data)
    }

    const getProducts2 = async () => {
        const res = await axiosSSR.get("/api/products/")
        setProducts2(res.data)
    }

    const getUsers = async () => {
        const res = await axiosSSR.get("/api/companies/")
        setUser(res.data)
    }

    useEffect(() => {
        if (userDetail.userDetail?.role === "Client") {
            navigate("/profile")
        }
    }, [userDetail.userDetail])

    useEffect(() => {
        if (!window.localStorage.getItem("token")) {
            navigate("/")
        } else {
            getCompanies().then(r => r)
            getProducts().then(r => r)
            getProducts2().then(r => r)
            getUsers().then(r => r)
        }
    }, [])

    const handlerClick = async (e) => {
        e.preventDefault()
        const data = {
            currency: requestState.currency,
            price: requestState.price,
            product_or_service: requestState.product_or_service,
            sell_or_buy: requestState.sell_or_buy,
            status_gen: requestState.status_gen,
            date: requestState.date,
            deal_number: requestState.deal_number,
            mode: requestState.mode,
            client_course: requestState.client_course,
            outgoing_currency: requestState.outgoing_currency,
            internal_course: requestState.internal_course,
            outgoing_amount: requestState.outgoing_amount,
            to_company: requestState.to_company,
            bank: requestState.bank,
            from_company: requestState.from_company,
            counterparty_bank: requestState.counterparty_bank,
            product_category: requestState.product_category,
            product: requestState.product,
            status: "Todo",
            user: requestState.user.id,
            bank_name: requestState.bank_name,
            transaction_type: requestState.transaction_type
        }
        await axiosSSR.post("/api/request/", data).then(res => {
            setRequestState({
                currency: "",
                price: 0,
                product_or_service: "",
                sell_or_buy: "",
                status: true,
                date: "",
                deal_number: 0,
                mode: "",
                client_course: 0,
                outgoing_currency: "",
                internal_course: 0,
                outgoing_amount: 0,
                to_company: 0,
                bank: 0,
                from_company: 0,
                counterparty_bank: "",
                product_category: "",
                product: "",
                user: "",
                bank_name: "",
                transaction_type: "",
            })
            if (res?.error?.statusCode === 400) {
                setError(true)
                return res
            }
            setAl(true)
            setDocx(res.data)
            return res
        })
    }
    const clearState = (e) => {
        e.preventDefault()
        setRequestState({
            currency: "",
            price: 0,
            product_or_service: "",
            sell_or_buy: "",
            status: true,
            date: "",
            deal_number: 0,
            mode: "",
            client_course: 0,
            outgoing_currency: "",
            internal_course: 0,
            outgoing_amount: 0,
            to_company: 0,
            bank: 0,
            from_company: 0,
            counterparty_bank: "",
            product_category: "",
            product: "",
            transaction_type: "",
            user: "",
            bank_name: ""
        })
    }
    useEffect(() => {
        setRequestState(prevState => ({
            ...prevState,
            price: requestState.outgoing_amount * requestState.client_course
        }))
    }, [requestState.outgoing_amount, requestState.client_course])

    function selectCompanyClick(item) {
        setRequestState(prevState => ({
            ...prevState,
            from_company: item.id
        }))
    }

    function toCompanyFunc(item) {
        setRequestState(prevState => ({
            ...prevState,
            to_company: item.id
        }))
    }

    return (
        <>
            <form onSubmit={handlerClick}>
                <Select
                    value={requestState.bank_name}
                    onChange={handlerChange}
                    title={"Название банка:"}
                    currency={banks}
                    name={"bank_name"}
                />

                <Select
                    currency={transactionTypes}
                    name={"transaction_type"}
                    value={requestState.transaction_type}
                    onChange={handlerChange}
                    title={"Тип операции:"}
                />

                <Select
                    value={requestState.currency}
                    onChange={handlerChange}
                    title={"Валюта:"}
                    currency={currency}
                    name={"currency"}
                />

                <Select
                    value={requestState.product_or_service}
                    onChange={handlerChange}
                    title={"Товар или услуга:"}
                    currency={[{title: "Product", meaning: "Product"}, {title: "Service", meaning: "Service"}]}
                    name={"product_or_service"}
                />

                <Select
                    currency={[{title: "Sell", meaning: "Sell"}, {title: "Buy", meaning: "Buy"}]}
                    title={"Продать или купить:"}
                    onChange={handlerChange}
                    value={requestState.sell_or_buy}
                    name={"sell_or_buy"}
                />

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Дата:</p>
                    <div className="col-8">
                        <input type="date" className="form-control" value={requestState.date} name="date"
                               onChange={handlerChange}/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Номер сделки:</p>
                    <div className="col-8">
                        <input type="number" className="form-control" value={requestState.deal_number}
                               name="deal_number"
                               onChange={handlerChange}/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Режим:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="mode"
                                value={requestState.mode}
                                onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            <option value="Bank client">Bank client</option>
                            <option value="Operator">Operator</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Клиентский курс:</p>
                    <div className="col-8">
                        <input type="number" step="0.01" className="form-control" name="client_course"
                               value={requestState.client_course} onChange={handlerChange}/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Исходящая валюта:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="outgoing_currency"
                                value={requestState.outgoing_currency} onChange={handlerChange} required>
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
                    <p className="mb-0 col-4">Внутренний курс:</p>
                    <div className="col-8">
                        <input type="number" step="0.01" className="form-control" name="internal_course"
                               value={requestState.internal_course} onChange={handlerChange}/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Исходящая сумма:</p>
                    <div className="col-8">
                        <input type="number" className="form-control" name="outgoing_amount"
                               value={requestState.outgoing_amount}
                               onChange={handlerChange}/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Входящая сумму:</p>
                    <div className="col-8">
                        <input type="number" className="form-control" min="0" name="price" value={requestState.price}
                               onChange={handlerChange} required/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Наша компания:</p>
                    <div className="col-8">
                        <CustomSelect selectCompanyClick={toCompanyFunc}/>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Банк нашей компании:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="bank"
                                value={requestState.bank}
                                onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                companies?.find(el => el.id === Number(requestState.to_company))?.banks?.map((item, idx) => (
                                    <option key={idx} value={item.id}>{item.company_bank_name_en}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Пользователь:</p>
                    <div className="col-8">
                        <div className="custom-select h-100">
                            <div className="d-flex form-control h-100" onClick={() => setUserSearch(!userSearch)}>{requestState.user ? requestState.user.username : "..."}</div>
                            <div className="my-list" style={userSearch ? {display: "block"} : {}}>
                                <span className="d-block p-2">
                                    <input className="form-control" value={userSearchValue} placeholder="Поиск"
                                           onChange={(e) => setUserSearchValue(e.target.value)}/>
                                </span>
                                {
                                    newUserArray?.map((item, idx) => (
                                        <div key={idx} onClick={() => {
                                            handlerChange({target: {name: "user", value: item}})
                                            setUserSearch(!userSearch)
                                            setUserSearchValue("")
                                        }}>
                                            {item.username}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Компания контрагента:</p>
                    <div className="col-8">
                        <div className="custom-select h-100">
                            <div className="d-flex form-control h-100" onClick={() => setFromCompanySearch(!fromCompanySearch)}>{requestState.from_company ? requestState.from_company.company_full_name_ru : "..."}</div>
                            <div className="my-list" style={fromCompanySearch ? {display: "block"} : {}}>
                                <span className="d-block p-2">
                                    <input className="form-control" value={fromCompanySearchValue} placeholder="Поиск"
                                           onChange={(e) => setFromCompanySearchValue(e.target.value)}/>
                                </span>
                                {
                                    newFromCompanyArray?.map((item, idx) => (
                                        <div key={idx} onClick={() => {
                                            handlerChange({target: {name: "from_company", value: item}})
                                            setFromCompanySearch(!fromCompanySearch)
                                            setFromCompanySearchValue("")
                                        }}>
                                            {item.company_full_name_ru}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {/*<select className="form-select" aria-label="Default select example" name="from_company"*/}
                        {/*        value={requestState.from_company} onChange={handlerChange} required>*/}
                        {/*    <option defaultValue>...</option>*/}
                        {/*    {*/}
                        {/*        user?.find(el => el.id === Number(requestState?.user?.id))?.companies?.map((item, idx) => (*/}
                        {/*            <option key={idx} value={item.id}>{item.company_full_name_ru}</option>*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</select>*/}
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Банк контрагента:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="counterparty_bank"
                                value={requestState.counterparty_bank} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                user?.find(el => el.id === Number(requestState?.user?.id))?.companies?.find(el => el.id === Number(requestState.from_company.id))?.banks?.map((item, idx) => (
                                    <option key={idx} value={item.id}>{item.company_bank_name_en}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="row mt-3 align-items-center">
                    <p className="mb-0 col-4">Категория продукта:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="product_category"
                                value={requestState.product_category} onChange={handlerChange} required>
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
                    <p className="mb-0 col-4">Товар:</p>
                    <div className="col-8">
                        <select className="form-select" aria-label="Default select example" name="product"
                                value={requestState.product} onChange={handlerChange} required>
                            <option defaultValue>...</option>
                            {
                                products2?.map((item, idx) => (
                                    <option value={item.id} key={idx}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className='d-flex justify-content-between mb-5 mt-3 align-items-center'>
                    <div>
                        {
                            docx ? <a href={docx.traid} download>Скачать документ</a> : null
                        }
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
        </>
    )
};

export default Request;