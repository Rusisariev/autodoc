import React from 'react';

const Select = ({title, value, onChange, currency, name}) => {
  return (
    <div className="row mt-3 align-items-center">
      <p className="mb-0 col-4">{title}</p>
      <div className="col-8">
        <select
          className="form-select"
          aria-label="Default select example"
          name={name}
          value={value}
          onChange={onChange}
          required
        >
          <option defaultValue>...</option>
          {
            currency.map((item, idx) => {
              return <option value={item.meaning} key={idx}>{item.title}</option>
            })
          }
        </select>
      </div>
    </div>
  );
};

export default Select;