import React from 'react';
import OrderCard from './OrderList'; 

function OrderList({ orders }) {
  return (
    <div className="order-list">
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
}

export default OrderList;
