import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate en lugar de useHistory
import "./login.css";
import logo from "./images/logo_bq.png";
import { authorize, parseJwt } from "../../services/auth-services";

export function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos antes de enviar la solicitud
    if (!email || !password) {
      setError(true);
      return;
    }
    try {
      // Hacer la llamada a authorize con las credenciales del usuario
      const token = await authorize(email, password);
      const payload = parseJwt(token);
      // Si la autenticación fue exitosa, guardar el token en el estado o donde sea necesario
      setUser(payload);
     
    } catch (err) {
      setError(true);
    }
  };

  return (
    <section>
      <img src={logo} alt="Logo Burger Queen" className="logo-login" />
      <h1 className="title">Inicia Sesión</h1>
      <form className="login" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field-login"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field-login"
        />
        <button className="btn-continue">Continuar</button>
      </form>
      {error && <p className="p-error">Credenciales incorrectas. Inténtalo de nuevo.</p>}
    </section>
  );
}