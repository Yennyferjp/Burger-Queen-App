import React, { useState, useEffect } from 'react';
import style from "./OrderList.module.css";
import { Link } from "react-router-dom";
import update from "./images/update.png";
import { getOrdersFromBackend, updateOrderToBackend } from "../../services/orders-services";
import OrderCard from './OrderCard';

export function OrderList({ user }) {
  const [orderList, setOrderList] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    refreshOrderList();
  }, []);

  const refreshOrderList = async () => {
    try {
      const orders = await getOrdersFromBackend();
      setOrderList(orders);
    } catch (error) {
      console.error('Error al obtener las órdenes: ', error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleOrderDelivered = async (orderId) => {
    try {
      // Actualiza la orden en el backend como "Entregado"
      await updateOrderToBackend(orderId, 'Entregado');

      // Actualiza la lista de órdenes eliminando la orden entregada
      setOrderList((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error('Error al actualizar la orden: ', error);
    }
  };

  return (
    <div className={style.orderList}>
      <div className={style.tabs}>
        <Link
          to="/order"
          className={activeTab === 1 ? `${style.tabOrder} active` : style.tabOrder}
          onClick={() => handleTabClick(1)}
        >
          Ordenar
        </Link>
        <Link
          to="/order-list"
          className={activeTab === 2 ? `${style.tabOrderList} active` : style.tabOrderList}
          onClick={() => handleTabClick(2)}
        >
          Lista de Órdenes
        </Link>
      </div>
      <div className={style.orderListTitle}>Órdenes</div>
      <h2>{user ? `Hola Mesero ${user.userName}` : 'Hola Mesero'}</h2>
      <img src={update} alt="updateOrders" className={style.updateIcon} onClick={() => refreshOrderList()} />
      <div className={style.orderCardsSection}>
        {!orderList ? (
          <div className={style.loadingSpinner}></div>
        ) : orderList.length === 0 ? (
          "No hay órdenes"
        ) : (
          orderList.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onOrderDelivered={handleOrderDelivered}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default OrderList;
