import React from 'react';
import style from './CustomerInfo.module.css';

function CustomerInfo({ customer, table, setCustomer, setTable }) {

  const handleCustomerChange = (e) => {
    setCustomer(e.target.value);
  };

  const handleTableChange = (e) => {
    setTable(e.target.value);
  };

  return (
    <div className="customer-table">
      <input
        type="text"
        placeholder="Nombre del cliente"
        value={customer}
        onChange={handleCustomerChange}
        className={style.inputCustomerName}
      />
      <input
        type="number"
        placeholder="No. de mesa"
        value={table}
        onChange={handleTableChange}
        className={style.inputTableNumber}
      />
    </div>
  );
}

export default CustomerInfo;
