import React from 'react';
import style from './OrderSummary.module.css';

function OrderSummary({ order, totalOrder, removeProductFromOrder, clearOrder, sendOrder, customer, table }) {
  return (
    <div className={style.order}>
      {customer && <h2>{`👋 Hola  ${customer}`}</h2>}
      {table && <p>{`Mesa #: ${table}`}</p>}
      <div className="order-list">
        {order.map((product) => (
          <div key={product.id} className="order-item">
            <p>{product.name}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Precio: ${product.price}</p>
            <button onClick={() => removeProductFromOrder(product)}>-</button>
            <button onClick={() => addProductToOrder(product)}>+</button>
          </div>
        ))}
      </div>
      <p>Total: ${totalOrder}</p>
      <button onClick={clearOrder}>Limpiar Orden</button>
      <button onClick={sendOrder}>Enviar a Cocina</button>
    </div>
  );
}

export default OrderSummary;
