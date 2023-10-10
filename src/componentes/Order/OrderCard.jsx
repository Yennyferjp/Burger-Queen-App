import React from 'react';

function OrderCard({ order }) {

  return (
    <div className="order-card">
      <h3>{order.customerName}</h3>
      <p>Mesa: {order.customerTable}</p>
    </div>
  );
}

export default OrderCard;
