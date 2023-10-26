import React, { useState } from 'react';
import CustomerInfo from './CustomerInfo';
import ProductMenu from './ProductMenu';
import OrderSummary from './OrderSummary';
import Swal from 'sweetalert2';
import style from "./order.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Order({ user }) {
  const [customer, setCustomer] = useState('');
  const [table, setTable] = useState('');
  const [order, setOrder] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [isOrderStarted, setIsOrderStarted] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const addProductToOrder = (product) => {
    console.log(product);
    // Verifica si el producto ya está en el pedido
    const existingProduct = order.find((item) => item._id === product._id);

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
    if (product.quantity > 1) {
      const updatedProduct = { ...product, quantity: product.quantity - 1 };
      const updatedOrder = order.map((item) =>
        item._id === product._id ? updatedProduct : item
      );

      setOrder(updatedOrder);
    } else {
      const updatedOrder = order.filter((item) => item._id !== product._id);
      setOrder(updatedOrder);
    }
    // Actualiza el total del pedido
    setTotalOrder(totalOrder - product.price);
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

  const handleStartOrder = () => {
    setIsOrderStarted(true);
  };

  const handleTabClick = (tab) => {
    if (tab === 1) {
      setActiveTab('Ordenar');
    } else if (tab === 2) {
      setActiveTab('Lista de Órdenes');
    }
  };

  return (
    <div>
      <div className={style.orderList}>
        <div className={style.tabs}>
          <Link
            to="/order"
            className={`${style.tabOrder} ${activeTab === 'Ordenar' ? style.active : ''}`}
            onClick={() => handleTabClick(1)}
          >
            Ordenar
          </Link>
          <Link
            to="/order-list"
            className={`${style.tabOrderList} ${activeTab === 'Lista de Órdenes' ? style.active : ''}`}
            onClick={() => handleTabClick(2)}
          >
            Lista de Órdenes
          </Link>
        </div>
      </div>
      <div className="order-container">
        <h1 className='order-title'>
          ¡Hora de tomar la orden!
        </h1>
        <CustomerInfo
          customer={customer}
          table={table}
          setCustomer={setCustomer}
          setTable={setTable}

        />
        <div className={style.productAndOrder}>
          <ProductMenu addProductToOrder={addProductToOrder} />
          <OrderSummary
            order={order}
            totalOrder={totalOrder}
            addProductToOrder={addProductToOrder}
            removeProductFromOrder={removeProductFromOrder}
            clearOrder={clearOrder}
            sendOrder={sendOrder}
            customer={customer}
            table={table}
            onStartOrder={handleStartOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default Order;
