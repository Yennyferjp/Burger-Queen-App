import React, { useState, useEffect } from 'react';
import style from "./OrderList.module.css";
import Swal from 'sweetalert2';
import update from "./images/update.png";
import { getOrdersFromBackend, updateOrderToBackend } from "../../services/orders-services";
import OrderCard from './OrderCard';
import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";
import { useNavigate, Link, useMatch } from "react-router-dom";

export function OrderList({ user }) {
  const [orderList, setOrderList] = useState([]);
  // const [activeTab, setActiveTab] = useState(1);

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

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  const [activeButton, setActiveButton] = useState('Tomar orden');

  const changeActiveCategory = (category) => {
    setActiveButton(category);
  }

  const handleCheckClicked = async (orderId, orderStatus) => {
    try {
      if(orderStatus === 'PENDIENTE'){
        Swal.fire({
          icon: 'info',
          title: 'Orden en Preparación',
          text: 'La orden aún está en preparación y no puede ser entregada. Por favcor, espere!',
        });
        return;
      }
      if (orderStatus === 'LISTO PARA ENTREGAR' ) {
        const isConfirmed = await Swal.fire({
          title: '¿La orden ya fue entregada?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No',
        });
  
        if (!isConfirmed.isConfirmed) {
          return;
        }
      }
  
      // Elimina la orden entregada de la lista local
      setOrderList((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
  
      if (orderStatus === 'COMPLETADO') {
        return;
      }
  
      // Actualiza la orden en el backend como "Entregado"
      await updateOrderToBackend(orderId, 'ENTREGADO');
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
    }
  };

  const takeOrderMatch = useMatch("/order");
  const orderListsMatch = useMatch("/order-list");
  
  return (
    <div className={style.orderList}>
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
          <div className={style.navbarLogoOrder}>
            <img
              src={logo}
              alt="Imagen 2"
              className={style.navbarImageLogo}
            />
          </div>
      </div>
      <div className={style.interfaceCategories} id="interface-buttons">
      <Link
          to="/order"
          className={`${style['btnTakeOrder']} 
          ${takeOrderMatch !== null ? style['activeButton'] : ''}`}
          > Tomar orden
        </Link>
        <Link
          to="/order-list"
          className={`${style['btnOrderList']} 
          ${orderListsMatch !== null ? style['activeButton'] : ''}`}
        > Lista de Órdenes
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
              onCheckClicked={handleCheckClicked}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default OrderList;
