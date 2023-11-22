import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);

    if (loggedInUser.rol === "waiter") {
      navigate("/order");
    }else if (loggedInUser.rol == "admin"){
       navigate("/users");
    } else if(loggedInUser.rol == "chef"){
      navigate("/kitchen-orders");
    }
  }

  return (
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setUser={handleLogin} />} />
          <Route path="/order" element={<Order />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order-list" element={<OrderList  user={user} />} />
          <Route path="/kitchen-orders" element={<Kitchen user={user} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
  );
}

export default App;
