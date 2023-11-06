import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import style from "./OrderList.module.css";
import OrderCard from './OrderCard';
import update from "./images/update.png";
import { getOrdersFromBackend } from "../../services/orders-services";

import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";

export function OrderList() {
  const [orderList, setOrderList] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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

  return (
    <div className={style.orderList}>
      <div className={style.navbarList}>
        <nav>
          <div className="navbar-left">
            <img
              src={logout}
              alt="logout"
              className="navbar-image-logout"
            />
            <p className="navbar-logout" onClick={handleLogoutClick}>
              Salir
            </p>
          </div>
          <div className="navbar-right">
            <img
              src={logo}
              alt="Imagen 2"
              className="navbar-image-logo"
            />
          </div>
        </nav>
      </div>
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
      <h2>Hola, Mesero Juan</h2>
      <img src={update} alt="updateOrders" className={style.updateIcon} />
      <div className={style.orderCardsSection}>
        {!orderList ? (
          <div className={style.loadingSpinner}></div>
        ) : orderList.length === 0 ? (
          "No hay órdenes"
        ) : (
          orderList.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}

export default OrderList;
