import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import axiosSSR from "../axios";

const PaymentOrder = () => {
  const navigate = useNavigate()
  const userDetail = useSelector(state => state.user)

  const [paymentOrders, setPaymentOrders] = useState([])
  const [search, setSearch] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    getPaymentOrders().then(r => r)
  }, [])

  useEffect(() => {
    if(userDetail.userDetail?.role === "Client") {
      navigate("/profile")
    }
  }, [userDetail.userDetail])

  const getPaymentOrders = async (search = "", date = "") => {
    const res = await axiosSSR.get(`/api/payment_order/?contract__number=${search}&date=${date}`)
    setPaymentOrders(res.data)
  }

  const handlerChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handlerChangeDate = (e) => {
    setDate(e.target.value)
  }

  const resetClick = () => {
    setSearch("")
    setDate("")
    getPaymentOrders().then(r => r)
  }

  const applyClick = () => {
    getPaymentOrders(search, date).then(r => r)
  }

  return (
    <div className="">
      <div className="row mt-3 align-items-center mb-3">
        <div className="col-5">
          <input type="text" className="form-control" placeholder={"Номер контракта"} value={search} name="" onChange={handlerChangeSearch} />
        </div>
        <div className="col-4">
          <input type="date" className="form-control" value={date} name="" onChange={handlerChangeDate} />
        </div>
        <div className="col">
          <button className="btn-danger btn w-100" onClick={resetClick}>Сбросить</button>
        </div>
        <div className="col">
          <button className="btn-primary btn w-100" onClick={applyClick}>Применить</button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {
          paymentOrders.map((item, idx) => (
            <div key={idx} className="col mb-3">
              <div className="card p-2">
                <p>Номер контракта: {item.contract_number}</p>
                <p>Дата: {item.date}</p>
                <a href={item.application} download>Скачать приложение</a>
                <a href={item.payment_order} download>Скачать платежное поручение</a>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default PaymentOrder;