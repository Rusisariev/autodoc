import React, {useState} from 'react';

const MultiSelect = ({options, onClick, className, headerTitle, valueResult}) => {
    const [dropdown, setDropdown] = useState(false)
    return (
        <div className={`${className} row mt-3 align-items-center`}>
            <p className="mb-0 col-4">{headerTitle}</p>

            <div className="col-8">
                <div className="custom-select">
                    <div className="form-select" style={{cursor: "pointer"}} onClick={() => setDropdown(!dropdown)}>
                        {
                            valueResult.length ? (
                                <div>
                                    {
                                        valueResult.map((el, idx) => (
                                            `${el.contract_number}${idx !== valueResult.length - 1 ? ", " : ""}`
                                        ))
                                    }
                                </div>
                            ) : "..."
                        }
                    </div>
                    <div style={dropdown ? {display: "block"} : {display: "none"}} className="my-list">
                        {
                            options.map(el => (
                                <div
                                    key={el.id}
                                    onClick={() => onClick(el)}
                                    style={valueResult.findIndex(item => el.id === item.id) !== -1 ? {background: "#3333ff", color: "#fff"} : {}}
                                >
                                    {el.contract_number}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiSelect;