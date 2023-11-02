import React from 'react';
import style from './OrderSummary.module.css';
import Swal from 'sweetalert2';
import lessIcon from './images/less.png';
import plusIcon from './images/plus.png';
import { createOrderToBackend } from "../../services/orders-services";

export const OrderStatus = {
  ENVIADA: 0,
  PENDIENTE: 1,
  COMPLETADA: 2,
};
function OrderSummary({
  products,
  totalOrder,
  addProductToOrder,
  removeProductFromOrder,
  clearOrder,
  sendOrder,
  customer,
  table,
}) {


  const handleSendOrder = async () => {
    if (!customer || !table) {
      Swal.fire(
        'Espera',
        'Los campos de cliente y mesa no pueden estar vacíos. Agregue la información antes de ordenar.',
        'warning'
      );
    } else {
      try {
        let newOrder = {
          userId: 0, // No enviar desde el frontend, crear función en el auth middleware para extraer el id del usuario, ver cómo se hace para validar el rol
          client: customer,
          table: table,
          products: products.map((product) => ({
            qty: product.quantity,
            product: {
              id: product._id,
              name: product.name,
              price: product.price,
              image: product.image, 
              type: product.type, 
            },
          })),
          status:  OrderStatus.PENDIENTE,
        };
  
        newOrder = await createOrderToBackend(newOrder);
        Swal.fire('Orden Creada', 'La orden se ha creado exitosamente', 'success');
        sendOrder();
      } catch (error) {
        console.error('Error al crear la orden: ', error);
        Swal.fire('Error', 'Hubo un error al crear la orden', 'error');
      }
    }
  }

  // Calcula el monto total de la orden
  const calculateTotal = () => {
    let total = 0;
    for (const product of products) {
      total += product.price * product.quantity;
    }
    return total;
  };

  return (
    <div className={style.order}>
      {customer && <h2 className={style.nameCustomer}>{`Hola, ${customer} 👋`}</h2>}
      {table && <p className={style.numberTable}>{`Mesa # ${table}`}</p>}
      <h1 className={style.orden}>Orden</h1>
      <hr />
      <div className="order-list">
        <table className={style.orderTable}>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <img
                    src={lessIcon}
                    alt="Restar"
                    className={style.iconLess}
                    onClick={() => removeProductFromOrder(product)}
                  />
                </td>
                <td>{product.quantity}</td>
                <td>
                  <img
                    src={plusIcon}
                    alt="Sumar"
                    className={style.iconPlus}
                    onClick={() => addProductToOrder(product)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <p className={style.totalOrder}>Total ${calculateTotal()}</p>
      <div className={style.btns}>
        <button className={style.btnClear} onClick={clearOrder}>
          Limpiar
        </button>
        <button className={style.btnSend} onClick={handleSendOrder}>
          Ordenar
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
