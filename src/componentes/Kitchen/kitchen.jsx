import React, { useState, useEffect } from 'react';
import style from "./kitchen.module.css";
import { useNavigate } from "react-router-dom";
import OrderCardKitchen from './orderCardKitchen';

import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";
import update from "./images/update.png";

export function Kitchen() {
  const [kitchenOrders, setKitchenOrders] = useState(null);

  useEffect(() => {  // se utiliza para manejar el ciclo de vida de la aplicación
    refreshOrderList();
  }, []);

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  const refreshOrderList = async () => {
    setTimeout(() => {
      // Nombres de chocolate, mapear con los de Yenny
      setKitchenOrders([
        {
          'mesa': 'Mesa 1',
          'productos': [
            {
              '_id': 'qwertyuiop',
              'nombre': 'Café americano',
              'tipo': 'Desayuno',
              'precio': '15',
              'cantidad': '2'
            },
            {
              '_id': 'asdfghjkl',
              'nombre': 'Latte',
              'tipo': 'Almuerzo',
              'precio': '25',
              'cantidad': '1'
            }
          ],
          'total': '55',
          'estado': 'Pendiente'
        },
        {
          'mesa': 'Mesa 8',
          'productos': [
            {
              '_id': 'vdsvsfddp',
              'nombre': 'Chilaquiles',
              'tipo': 'Desayuno',
              'precio': '50',
              'cantidad': '2'
            },
            {
              '_id': 'fdesfewe',
              'nombre': 'Limonada',
              'tipo': 'Almuerzo',
              'precio': '25',
              'cantidad': '1'
            },
            {
              '_id': 'gwegwsd',
              'nombre': 'Agua embotellada',
              'tipo': 'Almuerzo',
              'precio': '25',
              'cantidad': '1'
            },
            {
              '_id': 'wqfewd',
              'nombre': 'Sándwich',
              'tipo': 'Almuerzo',
              'precio': '25',
              'cantidad': '1'
            },
            {
              '_id': 'vewvew',
              'nombre': 'Ensalada',
              'tipo': 'Almuerzo',
              'precio': '25',
              'cantidad': '1'
            }
          ],
          'total': '55',
          'estado': 'Pendiente'
        },
        {
          'mesa': 'Mesa 7',
          'productos': [
            {
              '_id': 'poiuytrewq',
              'nombre': 'Jugo de naranja',
              'tipo': 'Desayuno',
              'precio': '15',
              'cantidad': '2'
            },
            {
              '_id': 'ñlkjhgfdsa',
              'nombre': 'Chai Latte',
              'tipo': 'Almuerzo',
              'precio': '40',
              'cantidad': '1'
            }
          ],
          'total': '70',
          'estado': 'Preparada'
        }
      ]);
    },
      1000);
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
        <img src={update} alt="updateOrders" className={style.updateIcon} />
        <div className={style.orderCardsKitchen}>
          {!kitchenOrders ? (
            <div className={style.loadingSpinner}></div>
          ) : kitchenOrders.length === 0 ? (
            "No hay órdenes"
          ) : (
            kitchenOrders.map((order) => (
              <OrderCardKitchen key={order.orderId} order={order} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}


