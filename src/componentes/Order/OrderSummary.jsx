import React from 'react';
import style from './OrderSummary.module.css';
import Swal from 'sweetalert2';
import lessIcon from './images/less.png';
import plusIcon from "./images/plus.png";

function OrderSummary({ order, totalOrder, addProductToOrder, removeProductFromOrder, clearOrder, sendOrder, customer, table }) {
  const handleSendOrder = () => {
    if (!customer || !table) {
      Swal.fire('Espera', 'Los campos de cliente y mesa no pueden estar vacíos. Agregue la información antes de ordenar.', 'warning');
    } else {
      sendOrder();
    }
  };
  // Calcula el valor total de la orden sumando el precio de cada producto multiplicado por su cantidad
  const calculateTotal = () => {
    let total = 0;
    for (const product of order) {
      total += product.price * product.quantity;
    }
    return total;
  };

  return (
    <div className={style.order}>
      {customer && <h2 className={style.nameCustomer}>{`Hola,  ${customer} 👋`}</h2>}
      {table && <p className={style.numberTable}>{`Mesa # ${table}`}</p>}
      <h1 className={style.orden}>Orden</h1>
      <hr />
      <div className="order-list">
        <table className={style.orderTable}>
          <tbody>
            {order.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                  <td>
                    <img src={lessIcon} alt="Restar" className={style.iconLess} onClick={() => removeProductFromOrder(product)} />
                  </td>
                  <td>{product.quantity}</td>
                  <td>
                    <img src={plusIcon} alt="Sumar" className={style.iconPlus} onClick={() => addProductToOrder(product)} />
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <p className={style.totalOrder}>Total ${calculateTotal()}</p>
      <div className={style.btns}>
        <button className={style.btnClear} onClick={clearOrder}>Limpiar</button>
        <button className={style.btnSend} onClick={handleSendOrder} >Ordenar</button>
      </div>
    </div>
  );
}

export default OrderSummary;
