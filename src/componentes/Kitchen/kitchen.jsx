import React, { useState, useEffect } from 'react';
import style from "./kitchen.module.css";
import { getOrdersFromBackend } from "../../services/orders-services";
import { useNavigate } from "react-router-dom";
import OrderCardKitchen from './orderCardKitchen';
import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";
import update from "./images/update.png";

export function Kitchen() {
  const [kitchenOrders, setKitchenOrders] = useState(null);

  useEffect(() => {
    refreshOrderList();
  }, []);

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  const refreshOrderList = async () => {
    setKitchenOrders(null);
    try {
      const orders = await getOrdersFromBackend(); 
      setKitchenOrders(orders);
    } catch (error) {
      console.error('Error al obtener las órdenes de la cocina: ', error);
    }
  };

  return (
    <div>
      <div className="navbar-products">
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
      <div className={style.ordersContainer}>
        <h1 className={style.kitchenTitle}>Órdenes por preparar</h1>
        <h2>Hola, Chef Juanita</h2>
        <img src={update} alt="updateOrders" className={style.updateIcon} onClick={() => refreshOrderList()} />
        <div className={style.orderCardsKitchen}>
          {!kitchenOrders ? (
            <div className={style.loadingSpinner}></div>
          ) : kitchenOrders.length === 0 ? (
            "No hay órdenes"
          ) : (
            kitchenOrders.map((order) => (
              <OrderCardKitchen key={order._id} order={order} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Kitchen;
