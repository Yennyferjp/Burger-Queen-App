import React from 'react';
import style from "./orderCardKitchen.module.css";
import check from "./images/check.png";

export function OrderCardKitchen({ order }) {

  return (
    <div className={style.orderCardKitchen}>
      <div className={style.cardHeader}>
        <h4>{order.mesa}</h4>
        <img src={check} alt="check" className={style.checkIcon}/>
      </div>
      <hr></hr>
      <div className={style.orderSection}>
        {order.productos.map(producto => <>
          <div className={style.productQuantity}>
            <h2> {producto.nombre} </h2>
            <h2> {producto.cantidad} </h2>
          </div>
        </>)}
      </div>
      <button className={style.orderStatus}>PREPARAR</button>
    </div>
  );
}

export default OrderCardKitchen;