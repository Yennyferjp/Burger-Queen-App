import React, { useState, useEffect } from 'react';
import style from "./OrderList.module.css";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import update from "./images/update.png";
import { getOrdersFromBackend, updateOrderToBackend } from "../../services/orders-services";
import OrderCard from './OrderCard';
import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";
import { useNavigate } from "react-router-dom";

export function OrderList({ user }) {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshOrderList();
  }, []);

  const refreshOrderList = async () => {
    try {
      setLoading(true);
      const orders = await getOrdersFromBackend();
      setOrderList(orders);
    } catch (error) {
      console.error('Error al obtener las órdenes: ', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  const [activeButton, setActiveButton] = useState('Tomar orden');

  const changeActiveCategory = (category) => {
    setActiveButton(category);
  };

  const handleCheckClicked = async (orderId, orderStatus) => {
    try {
      let confirmationTitle, backendStatus;
  
      if (orderStatus === 'PENDIENTE') {
        confirmationTitle = '¿Desea cancelar la orden?';
        backendStatus = 'CANCELADO';
      } else if (orderStatus === 'LISTO PARA ENTREGAR') {
        confirmationTitle = '¿La orden ya fue entregada?';
        backendStatus = 'COMPLETADO';
      }
  
      const isConfirmed = await Swal.fire({
        title: confirmationTitle,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      });
  
      if (!isConfirmed.isConfirmed) {
        return;
      }
  
      // Elimina la orden de la lista local
      setOrderList((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
  
      // Actualiza la orden en el backend
      await updateOrderToBackend(orderId, backendStatus);
    } catch (error) {
      console.error('Error al manejar la acción de la orden:', error);
    }
  };

  return (
    <div className={style.orderList}>
      <div className={style.navbar}>
        <nav>
          <div className="navbar-left">
            <img
              src={logout}
              alt="logout"
              className="navbar-image-logout" />
            <p className="navbar-logout"
              onClick={handleLogoutClick}>
              Salir
            </p>
          </div>
          <div className={style.navbarLogoOrder}>
            <img src={logo} alt="Imagen 2" className="navbar-image-logo" />
          </div>
        </nav>
      </div>
      <div className={style.interfaceCategories} id="interface-buttons">
        <Link
          to="/order"
          className={`${style['btn-take-order']} 
          ${activeButton === 'Tomar orden' ? style['active'] : ''}`}
          onClick={() => {
            changeActiveCategory('Tomar orden');
          }}
        >
          {' '}
          Tomar órden
        </Link>
        <Link
          to="/order-list"
          className={`${style['btn-order-list']} 
          ${activeButton === 'Lista de Órdenes' ? style['active'] : ''}`}
          onClick={() => {
            changeActiveCategory('Lista de Órdenes');
          }}
        >
          {' '}
          Lista de Órdenes
        </Link>
      </div>
      <h2 style={{ marginTop: '50px' }}>{user ? `Hola Mesero ${user.userName}` : 'Hola Mesero'}</h2>
      <h1 className={style.orderListTitle}>Órdenes</h1>
      <img
        src={update}
        alt="updateOrders"
        className={style.updateIcon}
        onClick={() => refreshOrderList()}
      />
      <div className={style.orderCardsSection}>
        {orderList.length > 0 && !loading && (
          orderList.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onCheckClicked={handleCheckClicked}
            />
          ))
        )}
      </div>
      {loading && <div className={style.loadingSpinner}></div>}

      {orderList.length === 0 && !loading && (
        <p className={style.noOrdersText}>No hay órdenes</p>
      )}
    </div>
  );
}

export default OrderList;
