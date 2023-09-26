import React, { useState } from 'react';
import Swal from 'sweetalert2';
import "./order.css";
import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";
import { useNavigate } from "react-router-dom";

export function Order({ user }) {
  const [customer, setCustomer] = useState('');
  const [table, setTable] = useState('');
  const [breakfastProducts, setBreakfastProducts] = useState([]);
  const [lunchProducts, setLunchProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [activeCategory, setActiveCategory] = useState('breakfast'); 

  const addProductToOrder = (product) => {
    // Verifica si el producto ya está en el pedido
    const existingProduct = order.find((item) => item.id === product.id);

    if (existingProduct) {
       // Incrementa la cantidad del producto existente
      existingProduct.quantity++;
    } else {
       // Agrega el producto al pedido
      setOrder([...order, { ...product, quantity: 1 }]);
    }

    // Actualiza el total del pedido
    setTotalOrder(totalOrder + product.price);
  };

  const removeProductFromOrder = (product) => {
    const updatedOrder = order.filter((item) => item.id !== product.id);
    setOrder(updatedOrder);

    // Actualiza el total del pedido
    setTotalOrder(totalOrder - product.price * product.quantity);
  };

  const clearOrder = () => {
    setOrder([]);
    setTotalOrder(0);
    Swal.fire('Order cleared', 'The order has been cleared successfully', 'success');
  };

  const sendOrder = () => {
    
    Swal.fire('Pedido limpiado', 'El pedido se ha limpiado correctamente', 'success');
  };

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar-user">
        <nav>
          <div className="navbar-left">
            <img
              src={logout}
              alt="logout"
              className="navbar-logout" onClick={handleLogoutClick}
            />
            <p className="navbar-logout" onClick={handleLogoutClick} >
              Salir
            </p>
          </div>
          <div className="navbar-right">
            <img
              src={logo}
              alt="Logo Image"
              className="navbar-image-logo"
            />
          </div>
        </nav>
      </div>
      <div className="order-container">
        <h1 className='order-title'>Es hora de hacer el pedido</h1>
        <div className="customer-table">
          <input
            type="text"
            placeholder="Nombre del cliente"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className='input-customerName'
          />
          <input
            type="text"
            placeholder="Número de mesa"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className='input-tableNumber'
          />
        </div>
        <div className="content">
          <div className="menu">
            <div className="categories">
              <button
                className={`btn-breakfast ${activeCategory === 'breakfast' ? 'active' : ''}`}
                onClick={() => {
                  setBreakfastProducts(breakfastData);
                  setActiveCategory('breakfast');
                }}
              >
                DESAYUNO
              </button>
              <button
                className={`btn-lunch ${activeCategory === 'lunch' ? 'active' : ''}`}
                onClick={() => {
                  setLunchProducts(lunchData);
                  setActiveCategory('lunch');
                }}
              >
                ALMUERZO
              </button>
            </div>
          </div>
          <div className="products">
            <div className="product-list">
              {breakfastProducts.map((product) => (
                <div key={product.id} className="product">
                  <img src={product.image} alt={product.name} />
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                  <button onClick={() => addProductToOrder(product)}>Add</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order">
          <h2>Order</h2>
          <div className="order-list">
            {order.map((product) => (
              <div key={product.id} className="order-item">
                <p>{product.name}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => removeProductFromOrder(product)}>-</button>
                <button onClick={() => addProductToOrder(product)}>+</button>
              </div>
            ))}
          </div>
          <p>Total: ${totalOrder}</p>
          <button onClick={clearOrder}>Clear</button>
          <button onClick={sendOrder}>Order</button>
        </div>
      </div>
    </div>
  );
}
