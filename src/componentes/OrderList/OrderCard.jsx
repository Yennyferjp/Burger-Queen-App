import React, { useEffect, useState } from 'react';
import style from "./OrderCard.module.css";
import check from "./images/check.png";

function OrderCard({ order }) {

  return (
    <div className={style.orderCard}>
          <div className={style.cardHeader}>
            <h4>{`Mesa # ${order.table}`}</h4>
            <img src={check} alt="check" className={style.checkIcon} />
          </div>
          <hr></hr>
          <div className={style.orderSection}>
            {order.products.map((producto, index) => (
              <div className={style.productQuantity} key={index}>
                <h2>{producto.product.name}</h2>
                <h2>{producto.qty}</h2>
              </div>
            ))}
          </div>
          <button className={style.orderStatus}>PENDIENTE</button>
        </div>
  );
}

export default OrderCard;
