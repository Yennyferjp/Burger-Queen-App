import React, { useState, useEffect } from 'react';
import style from "./kitchen.module.css";
import { getOrdersFromBackend, updateOrderToBackend } from "../../services/orders-services";
import { useNavigate } from "react-router-dom";
import OrderCardKitchen from './orderCardKitchen';
import Swal from 'sweetalert2';
import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";
import update from "./images/update.png";

export function Kitchen({user}) {
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

  const updateOrderList = async (orderId, newStatus) => {
    try {
      await updateOrderToBackend(orderId, newStatus);


      setKitchenOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );

      Swal.fire({
        icon: 'success',
        title: 'Estado actualizado',
        text: `La orden ${orderId} está ${newStatus}.`,
      });
    } catch (error) {
      console.error('Error al actualizar la orden: ', error);
    }
  };

  return (
    <div>
      <div className={style.navbarProducts}>
      <div className={style.navbar}>
          <div className={style.navbarLeft}>
            <img
              src={logout}
              alt="logout"
              className={style.navbarImageLogout}
            />
            <p className={style.navbarLogout} onClick={handleLogoutClick}>
              Salir
            </p>
          </div>
          <div className={style.navbarRight}>
            <img
              src={logo}
              alt="Imagen 2"
              className={style.navbarImageLogo}
            />
          </div>
        </div>
      </div>
      <div className={style.ordersContainer}>
        <h1 className={style.kitchenTitle}>Órdenes por preparar</h1>
        <h2>{user ? `Hola Chef ${user.userName}` : 'Hola Chef'}</h2>
        <img src={update} alt="updateOrders" className={style.updateIcon} onClick={() => refreshOrderList()} />
        <div className={style.orderCardsKitchen}>
          {!kitchenOrders ? (
            <div className={style.loadingSpinner}></div>
          ) : kitchenOrders.length === 0 ? (
            "No hay órdenes"
          ) : (
            kitchenOrders.map((order) => (
              <OrderCardKitchen key={order._id} order={order} updateOrderList={updateOrderList} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Kitchen;
