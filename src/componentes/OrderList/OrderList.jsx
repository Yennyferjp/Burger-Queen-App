import React, { useState, useEffect } from 'react';
import OrderCard from './OrderCard'; 

export function OrderList() {
  const [orderList, setOrderList] = useState(null);

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
        'mesa': 'Mesa 7',
        'productos': [
          {
            '_id': 'poiuytrewq',
            'nombre': 'Frappuccino Pumpkin Spice, leche regular, shot de café extra',
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
    }, 1000);
  };

  []
  return (
    <div className="order-list">
      <div className='order-title'>Listado de órdenes</div>
      {!orderList && "Cargando órdenes"}
      {(orderList && orderList.length === 0) && "No hay órdenes"}
      {(orderList && orderList.length !== 0) && orderList.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
}

export default OrderList;
