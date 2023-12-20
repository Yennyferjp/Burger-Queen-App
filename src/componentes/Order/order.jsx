import React, { useState } from 'react';
import CustomerInfo from './CustomerInfo';
import ProductMenu from './ProductMenu';
import OrderSummary from './OrderSummary';
import Swal from 'sweetalert2';
import style from "./order.module.css";
import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";
import { useNavigate, Link, useMatch } from "react-router-dom";


export function Order({ user }) {
  const [customer, setCustomer] = useState('');
  const [table, setTable] = useState('');
  const [products, setProducts] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

  const addProductToOrder = (product) => {
    console.log(product);
    // Verifica si el producto ya está en el pedido
    const existingProduct = products.find((item) => item._id === product._id);

    if (existingProduct) {
      // Incrementa la cantidad del producto existente
      existingProduct.quantity++;
    } else {
      // Agrega el producto al pedido
      setProducts([...products, { ...product, quantity: 1 }]);
    }
    // Actualiza el total del pedido
    setTotalOrder(totalOrder + product.price);
  };

  const removeProductFromOrder = (product) => {
    if (product.quantity > 1) {
      const updatedProduct = { ...product, quantity: product.quantity - 1 };
      const updateProducts = products.map((item) =>
        item._id === product._id ? updatedProduct : item
      );

      setProducts(updateProducts);
    } else {
      const updatedProducts = products.filter((item) => item._id !== product._id);
      setProducts(updatedProducts);
    }
    // Actualiza el total del pedido
    setTotalOrder(totalOrder - product.price);
  };

  const clearOrder = () => {
    if (products.length === 0) {
      Swal.fire('Advertencia', 'La orden ya está vacía.', 'warning');
    } else {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esto eliminará todos los productos de la orden. ¿Estás seguro de que deseas continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, limpiar orden',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          setProducts([]);
          setTotalOrder(0);
          setCustomer('');
          setTable('');

          Swal.fire('Orden eliminada', 'La orden se ha eliminado correctamente', 'success');
        }
      });
    }
  };

  const sendOrder = () => {
    if (products.length === 0) {
      Swal.fire('Error', 'La orden está vacía. Agregue productos antes de enviar el pedido.', 'error');
    } else {
      clearOrder();
      // Actualizar estados para que queden vacíos o en su estado inicial
      setCustomer('');
      setTable('');
      setProducts([]);
      setTotalOrder(0);

      Swal.fire('Enviando Pedido', 'El pedido se ha enviado correctamente a cocina', 'success');
    }
  };

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  const handleStartOrder = () => {
    setIsOrderStarted(true);
  };

  const takeOrderMatch = useMatch("/order");
  const orderListsMatch = useMatch("/order-list");

  return (
    <div>
      <div className={style.takeOrder}>
        <div className={style.navbar}>
          <div className={style.navbarLeft}>
            <img
              src={logout}
              alt={style.logout}
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
      <div className="order-container">
        <h1 className='order-title'>
          ¡Hora de tomar la orden!
        </h1>
        <CustomerInfo
          customer={customer}
          table={table}
          setCustomer={setCustomer}
          setTable={setTable}

        />
        <div className={style.productAndOrder}>
          <ProductMenu addProductToOrder={addProductToOrder} />
          <OrderSummary
            products={products}
            totalOrder={totalOrder}
            addProductToOrder={addProductToOrder}
            removeProductFromOrder={removeProductFromOrder}
            clearOrder={clearOrder}
            sendOrder={sendOrder}
            customer={customer}
            table={table}
            onStartOrder={handleStartOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default Order;
