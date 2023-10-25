import React, { useState, useEffect } from 'react';
import style from "./OrderList.module.css";
import OrderCard from './OrderCard';
import { Link } from "react-router-dom";
import update from "./images/update.png";

export function OrderList() {
  const [orderList, setOrderList] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {  // se utiliza para manejar el ciclo de vida de la aplicación
    refreshOrderList();
  }, []);

  const refreshOrderList = async () => {
    setTimeout(() => {
      // Nombres de chocolate, mapear con los de Yenny
      setOrderList([
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  []
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
      <h2>Hola, Mesero Juan</h2>
      <img src={update} alt="updateOrders" className={style.updateIcon} />
      <div className={style.orderCardsSection}>
        {!orderList ? (
          <div className={style.loadingSpinner}></div>
        ) : orderList.length === 0 ? (
          "No hay órdenes"
        ) : (
          orderList.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))
        )}
      </div>
    </div>
  );
}
export default OrderList;
