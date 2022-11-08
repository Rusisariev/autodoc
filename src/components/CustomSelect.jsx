import React, {useEffect, useState} from 'react';
import axiosSSR from "../axios";

const CustomSelect = ({selectCompanyClick}) => {
    const [searchValue, setSearchValue] = useState("")
    const [state, setState] = useState(false)
    const [searchCompany, setSearchCompany] = useState([])

    const selectCompanyChange = (e) => {
        setSearchValue(e.target.value)
    }

    const getSearchCompany = async () => {
        await axiosSSR.get(`/api/companies/?search=${searchValue.replace(/ /ig, '+')}`)
            .then(res => setSearchCompany(res.data))
    }

    useEffect(() => {
        getSearchCompany()
        setState(false)
    }, [searchValue])

    return (
        <div className="custom-select">
            <input className="form-control" value={searchValue} onChange={selectCompanyChange}/>
            <div className="my-list" style={searchValue && !state ? {display: "block"} : {}}>
                {
                    searchCompany?.map((item, idx) => (
                        <div key={idx} onClick={() => {
                            selectCompanyClick(item)
                            setSearchValue(item.company_short_name_en)
                            setState(true)
                        }}>
                            {item.company_short_name_en}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CustomSelect;