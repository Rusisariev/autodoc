import React, {useEffect, useState} from 'react';
import axiosSSR from "../axios";

const CustomSelectClient = ({selectCompanyClick}) => {
    const [searchValue, setSearchValue] = useState("")
    const [state, setState] = useState(false)
    const [searchCompany, setSearchCompany] = useState([])
    const [value, setValue] = useState("Выберите компанию")

    const selectCompanyChange = (e) => {
        setSearchValue(e.target.value)
    }

    const getSearchCompany = async () => {
        await axiosSSR.get(`/api/companies/?search=${searchValue.replace(/ /ig, '+')}`)
            .then(res => setSearchCompany(res.data))
    }

    useEffect(() => {
        getSearchCompany()
    }, [searchValue])

    return (
        <div className="custom-select h-100">
            <div className="d-flex form-control h-100" onClick={() => setState(!state)}>{value}</div>
            <div className="my-list" style={state ? {display: "block"} : {}}>
                <span className="d-block p-2">
                    <input className="form-control" value={searchValue} placeholder="Поиск" onChange={selectCompanyChange}/>
                </span>
                {
                    searchCompany?.map((item, idx) => (
                        <div key={idx} onClick={() => {
                            selectCompanyClick(item)
                            setValue(item.company_short_name_en)
                            setState(false)
                        }}>
                            {item.company_short_name_en}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CustomSelectClient;