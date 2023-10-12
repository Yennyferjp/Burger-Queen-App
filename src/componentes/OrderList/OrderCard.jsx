import React from 'react';
import style from "./OrderCard.module.css";

function OrderCard({ order }) {

  return (
    <div className={style.orderCard}>
      <h3>Juan Pérez</h3>
      <h3>{order.customerName}</h3>
      <p>Mesa: {order.customerTable}</p>
    </div>
  );
}

export default OrderCard;
