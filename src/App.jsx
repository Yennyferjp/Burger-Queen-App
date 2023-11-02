import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from './componentes/Login/login';
import { Order } from './componentes/Order/order';
import { Users } from './componentes/Users/users';
import { Products } from './componentes/Products/products';
import { OrderList } from './componentes/OrderList/OrderList';
import { Kitchen } from './componentes/Kitchen/kitchen';

import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState([]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta para la página de inicio de sesión */}
          <Route path="/login" element={<Login setUser={setUser} />} />

          {/* Ruta para la página de pedidos */}
          <Route path="/order" element={<Order />}
          />

          {/* Ruta para la página de usuarios */}
          <Route path="/users" element={<Users />}
          />

          {/* Ruta para la página de productos */}
          <Route path="/products" element={<Products />}
          />

          {/* Ruta para la página de listado de órdenes */}
          <Route path="/order-list" element={<OrderList />}
          />

          {/* Ruta para la página de órdenes en cocina*/}
          <Route path="/kitchen-orders" element={<Kitchen />}
          />

          {/* Redirección predeterminada a la página de inicio de sesión */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
