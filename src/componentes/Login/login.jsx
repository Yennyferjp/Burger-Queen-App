import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate en lugar de useHistory
import "./login.css";
import logo from "./images/logo_bq.png";

export function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // Utiliza useNavigate para la navegación

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "holamundo@hola.com" && password === "Password123") {
      setError(false);
      setUser([email]);
      // Redirige al usuario a la página de órdenes después de iniciar sesión.
      navigate("/orden");
    } else {
      setError(true);
    }
  };

  return (
    <section>
      <img src={logo} alt="Logo Burger Queen" className="logo-login"/>
      <h1 className="titulo">Inicia Sesión</h1>
      <form className="login" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Continuar</button>
      </form>
      {error && <p>Credenciales incorrectas. Inténtalo de nuevo.</p>}
    </section>
  );
}
