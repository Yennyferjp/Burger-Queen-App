import React from 'react';
import style from "./OrderCard.module.css";
import check from "./images/check.png";

function OrderCard({ order }) {

  return (
    <div className={style.orderCard}>
      <div className={style.cardHeader}>
        <h4>{order.mesa}</h4>
        <img src={check} alt="check" className={style.checkIcon}/>
      </div>
      <hr></hr>
      {/* <h3>Juan Pérez</h3>
      <h3>{order.customerName}</h3> */}
      <div className={style.orderSection}>
        {order.productos.map(producto => <>
          <div className={style.productQuantity}>
            <h2> {producto.nombre} </h2>
            <h2> {producto.cantidad} </h2>
          </div>
        </>)}
      </div>
      <button className={style.orderStatus}>PENDIENTE</button>
    </div>
  );
}

export default OrderCard;
