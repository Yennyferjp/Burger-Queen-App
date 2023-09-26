import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from './componentes/Login/login';
import { Order } from './componentes/Order/order';
import { Users } from './componentes/Users/users';
import { Products } from './componentes/Products/products';

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

          {/* Redirección predeterminada a la página de inicio de sesión */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
