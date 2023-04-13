import React, {useState} from 'react';
import Select from "./UI/Select";
import {banks} from "./Request";
import axiosSSR from "../axios";

const Report = () => {
  const [state, setState] = useState({
    date_from: "",
    date_to: "",
    bank: "",
    user: ""
  })
  const [success, setSuccess] = useState([])

  const handlerChange = (e) => {
    const {name, value} = e.target
    setState(prevState => ({...prevState, [name]: value}))
  }

  const clearState = () => {
    setState({
      date_from: "",
      date_to: "",
      bank: "",
      user: ""
    })
  }

  const sendClick = async () => {
    const res = await axiosSSR.get(`/api/report/`, {params: {
        date_from: state.date_from,
        date_to: state.date_to,
        bank: state.bank,
        user: state.user
      }})
    setSuccess(res.data)
  }

  console.log(success);

  return (
    <div>
      <div className="row mt-3 align-items-center">
        <p className="mb-0 col-4">Дата от:</p>
        <div className="col-8">
          <input type="date" className="form-control" value={state.date_to} name="date_to" onChange={handlerChange} />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <p className="mb-0 col-4">Дата до:</p>
        <div className="col-8">
          <input type="date" className="form-control" value={state.date_from} name="date_from" onChange={handlerChange} />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <p className="mb-0 col-4">Пользователь:</p>
        <div className="col-8">
          <input type="text" className="form-control" value={state.user} name="user" onChange={handlerChange} />
        </div>
      </div>
      <Select
        value={state.bank}
        onChange={handlerChange}
        title={"Название банка:"}
        currency={banks}
        name={"bank"}
      />
      <div className='d-flex justify-content-between mb-5 mt-3 align-items-center'>
        <div>

        </div>
        <div>
          <button className="btn btn-danger me-3" onClick={clearState}>Сбросить</button>
          <button className="btn btn-primary" onClick={sendClick}>Отправить</button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {
          success.map(item => (
            <div key={item.id} className="col mb-3">
              <div className="card p-2">
                {item.id}
                <a href={item.inner_traid} download>Скачать внутренний трайд</a>
                <a href={item.traid} download>Скачать трайд</a>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Report;