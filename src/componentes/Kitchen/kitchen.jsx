import React, { useState, useEffect } from 'react';
import style from "./kitchen.module.css";
import { getOrdersFromBackend, updateOrderToBackend } from "../../services/orders-services";
import { useNavigate } from "react-router-dom";
import OrderCardKitchen from './orderCardKitchen';
import Swal from 'sweetalert2';
import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";
import update from "./images/update.png";
import { getUserInfo } from '../../services/auth-services';

export function Kitchen() {
  const user = getUserInfo();
  const [kitchenOrders, setKitchenOrders] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(true)
      const orders = await getOrdersFromBackend();
      setKitchenOrders(orders);
    } catch (error) {
      console.error('Error al obtener las órdenes de la cocina: ', error);
    }
    finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000)
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
      <div className="navbar-products">
        <nav>
          <div className="navbar-left">
            <img
              src={logout}
              alt="logout"
              className="navbar-image-logout"
            />
            <p className="navbar-logout"
              onClick={handleLogoutClick}>
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
        <h2 style={{ margin: '5px' }}>{user ? `Hola Chef ${user.userName}` : 'Hola Chef'}</h2>
        <h1 className={style.kitchenTitle}>Órdenes por preparar</h1>
        <img
          src={update}
          alt="updateOrders"
          className={style.updateIcon}
          onClick={() => refreshOrderList()} />
        <div className={style.orderCardsKitchen}>
          {kitchenOrders && !loading && kitchenOrders.length > 0 && (
            kitchenOrders.map((order) => (
              <OrderCardKitchen
                key={order._id}
                order={order}
                updateOrderList={updateOrderList}
              />
            ))
          )}
        </div>
      </div>
      {loading && <div className={style.loadingSpinner}></div>}
      {!loading && kitchenOrders && kitchenOrders.length === 0 && (
        <p className={style.noOrdersText}> No hay órdenes</p>
      )}
    </div>
  );
}

export default Kitchen;
