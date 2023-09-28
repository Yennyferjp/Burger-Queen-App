import React from 'react';
import style from './CustomerInfo.module.css';

function CustomerInfo({ customer, table, setCustomer, setTable }) {
  return (
    <div className="customer-table">
      <input
        type="text"
        placeholder="Nombre del cliente"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        className={style.inputCustomerName}
      />
      <input
        type="text"
        placeholder="Número de mesa"
        value={table}
        onChange={(e) => setTable(e.target.value)}
        className={style.inputTableNumber}
      />
    </div>
  );
}

export default CustomerInfo;
