import React, { useState } from 'react';
import CustomerInfo from './CustomerInfo';
import ProductMenu from './ProductMenu';
import OrderSummary from './OrderSummary';
import Swal from 'sweetalert2';
import "./order.css";
import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";
import { useNavigate } from "react-router-dom";

export function Order({ user }) {
  const [customer, setCustomer] = useState('');
  const [table, setTable] = useState('');

  const [order, setOrder] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

  const addProductToOrder = (product) => {
    // Verifica si el producto ya está en el pedido
    const existingProduct = order.find((item) => item.id === product.id);

    if (existingProduct) {
       // Incrementa la cantidad del producto existente
      existingProduct.quantity++;
    } else {
       // Agrega el producto al pedido
      setOrder([...order, { ...product, quantity: 1 }]);
    }

    // Actualiza el total del pedido
    setTotalOrder(totalOrder + product.price);
  };

  const removeProductFromOrder = (product) => {
    const updatedOrder = order.filter((item) => item.id !== product.id);
    setOrder(updatedOrder);

    // Actualiza el total del pedido
    setTotalOrder(totalOrder - product.price * product.quantity);
  };

  const clearOrder = () => {
    if (order.length === 0) {
      Swal.fire('Advertencia', 'La orden ya está vacía.', 'warning');
    } else {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esto eliminará todos los productos de la orden. ¿Estás seguro de que deseas continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, limpiar orden',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          setOrder([]);
          setTotalOrder(0);
          Swal.fire('Orden eliminada', 'La orden se ha eliminado correctamente', 'success');
        }
      });
    }
  };

  const sendOrder = () => {
    if (order.length === 0) {
      Swal.fire('Error', 'La orden está vacía. Agregue productos antes de enviar el pedido.', 'error');
    } else {
      Swal.fire('Enviando Pedido', 'El pedido se ha enviado correctamente a cocina', 'success');
    }
  };

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar-user">
        <nav>
          <div className="navbar-left">
            <img
              src={logout}
              alt="logout"
              className="navbar-logout" onClick={handleLogoutClick}
            />
            <p className="navbar-logout" onClick={handleLogoutClick} >
              Salir
            </p>
          </div>
          <div className="navbar-right">
            <img
              src={logo}
              alt="Logo Image"
              className="navbar-image-logo"
            />
          </div>
        </nav>
      </div>
      <div className="order-container">
        <h1 className='order-title'>Es hora de hacer el pedido</h1>
        <CustomerInfo customer={customer} table={table} setCustomer={setCustomer} setTable={setTable} />
        <div className='productandorder'>
        <ProductMenu addProductToOrder={addProductToOrder} />
        <OrderSummary order={order} totalOrder={totalOrder} removeProductFromOrder={removeProductFromOrder} clearOrder={clearOrder} sendOrder={sendOrder} />
        </div>
      </div>
    </div>
  );
}
