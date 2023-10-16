import React from 'react';
import style from "./OrderCard.module.css";
import OrderList from './OrderList';

function OrderCard({ order }) {

  return (
    <div className={style.orderCard}>
      <div className={style.cardHeader}>
        <h4>Mesa {order.customerTable}</h4>
        <hr></hr>
      </div>
      {/* <h3>Juan Pérez</h3>
      <h3>{order.customerName}</h3> */}
      <div className={style.orderSection}>
        <h2> {OrderList} </h2>
        <h2> Latte </h2>
      </div>
      <button className={style.orderStatus}>PENDIENTE</button>
    </div>
  );
}

export default OrderCard;
