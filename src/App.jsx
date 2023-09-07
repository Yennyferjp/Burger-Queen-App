import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from './componentes/Login/login';
import { Orden } from './componentes/Orden/orden';
import { Usuarios } from './componentes/Usuarios/usuarios';
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

          {/* Ruta para la página de órdenes */}
          <Route
            path="/orden"
            element={user.length > 0 ? <Orden user={user} setUser={setUser} /> : <Navigate to="/login" />}
          />

          {/* Ruta para la página de usuarios */}
          <Route path="/usuarios" element={<Usuarios />}
          />

          {/* Ruta para la página de productos */}
          <Route path="/productos" element={<Products />}
          /> 

          {/* Redirección predeterminada a la página de inicio de sesión */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
