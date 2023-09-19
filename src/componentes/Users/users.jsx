import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./users.css";
import { Link, useMatch } from "react-router-dom";
import {
  addUserToBackend,
  getUsersFromBackend,
  updateUserToBackend,
  deleteUserFromBackend,
  getRoleName,
  getRoles
} from "../../services/users-services";
import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";
import icon from "./images/icon-adduser.png";

Modal.setAppElement('#root');

export function Users() {
  // Estado para almacenar los usuarios creados
  const [users, setUsers] = useState([]);

  // Estado para gestionar los valores de los campos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRol] = useState("Administrador");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(true);

  // Estado para gestionar la apertura y cierre del modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Estado adicional para el usuario seleccionado en modo edición con modal
  const [userEditing, setUserEditing] = useState(null);

  // Cargar los usuarios una vez que el componente se monte
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para abrir el modal de edición con los datos del usuario seleccionado
  const openModal = (index) => {
    setUserEditing(index);
    setModalIsOpen(true);

    // Obtener los datos del usuario seleccionado
    const user = users[index];
    setName(user.name);
    setEmail(user.email);
    setRol(user.role);
    setPassword(user.password);
    setActive(user.active);
  };

  // Función para cerrar el modal de edición
  const closeModal = () => {
    setUserEditing(null);
    setModalIsOpen(false);
  };

  const saveChanges = async () => {
    if (name === "" || email === "" || role === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios",
      });
      return;
    }

    const updatedUser = {
      name: name,
      email: email,
      role: role,
      password: password,
      active: active,
    };

    try {
      if (userEditing !== null) {
        // Si estamos en modo de edición, actualiza el usuario en el backend
        const updatedUserResponse = await updateUserToBackend(users[userEditing]._id, updatedUser);

        // Actualiza la lista de usuarios en el estado
        const newUsers = [...users];
        newUsers[userEditing] = updatedUserResponse;
        setUsers(newUsers);

        Swal.fire({
          icon: "success",
          title: "Usuario Editado",
          text: "El usuario ha sido editado exitosamente.",
        });
      } else {
        // Si no estamos en modo de edición, agrega el nuevo usuario al backend
        const savedUser = await addUserToBackend(updatedUser);

        // Actualiza la lista de usuarios en el estado
        setUsers([...users, savedUser]);

        Swal.fire({
          icon: "success",
          title: "Usuario Agregado",
          text: "El usuario ha sido agregado exitosamente.",
        });
      }

      // Limpiar los campos del formulario
      setName("");
      setEmail("");
      setRol("");
      setPassword("");
      setActive(true);
      closeModal();
    } catch (error) {
      console.log("Error al agregar/editar Usuario", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al agregar/editar el usuario.",
      });
    }
  };


  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  // Función para agregar un nuevo usuario a la lista
  const saveNewUser = async () => {
    if (name === "" || email === "" || role === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios",
      });
      return;
    }

    // Crear un nuevo objeto de usuario
    const newUser = {
      name: name,
      email: email,
      role,
      password: password,
      active: active,
    };

    try {
      const savedUser = await addUserToBackend(newUser);

      if (userEditing !== null) {
        // Si estamos en modo de edición, actualiza el usuario seleccionado
        const newUsers = [...users];
        newUsers[userEditing] = newUser;
        setUsers(newUsers);

        Swal.fire({
          icon: "success",
          title: "Usuario Editado",
          text: "El usuario ha sido editado exitosamente.",
        });
      } else {
        // Si no estamos en modo de edición, agrega el nuevo usuario
        setUsers([...users, newUser]);

        Swal.fire({
          icon: "success",
          title: "Usuario Agregado",
          text: "El usuario ha sido agregado exitosamente.",
        });
      }

      // Limpiar los campos del formulario
      setName("");
      setEmail("");
      setRol("");
      setPassword("");
      setActive(true);

      // Cerrar el modal
      closeModal();
    } catch (error) {
      console.log("Error al agregar Usuario", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al agregar el usuario.",
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const usersList = await getUsersFromBackend();
      setUsers(usersList);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };


  // Función para eliminar un usuario de la lista
  const deleteUser = async (userId) => {
    try {
      // Eliminar el usuario en el backend
      await deleteUserFromBackend(userId);
  
      // Actualizar la lista de usuarios localmente
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
  
      Swal.fire({
        icon: "success",
        title: "Usuario Eliminado",
        text: "El usuario ha sido eliminado exitosamente.",
      });
    } catch (error) {
      console.error("Error al eliminar usuario", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al eliminar el usuario.",
      });
    }
  };
  


  // Realiza la redirección a la ruta de login cuando se hace clic en "Salir"
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  const usuariosMatch = useMatch("/users");
  const productosMatch = useMatch("/products");

  // Renderizar la interfaz de usuario
  return (
    <div>
      {/* Navbar */}
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
              alt="Imagen 2"
              className="navbar-image-logo"
            />
          </div>
        </nav>
      </div>
      <div >

        <h1 className="h1Users">Gestión de Usuarios</h1>



        {/* Modal para agregar usuario */}
        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          contentLabel="Agregar Usuario"
          className="custom-modal-adduser"
          ariaHideApp={true}
        >
          <h1 className="h1Users">Agregar Usuario</h1>
          <div className="form-group">
            <label className="label-style">Nombre:</label>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="label-style">Correo:</label>
            <input
              type="text"
              value={email}
              placeholder="Correo"
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="label-style">Rol:</label>
            <select
              value={role}
              onChange={(e) => setRol(e.target.value)}
              className="input-field"
            >
              {getRoles().map((item, index) => <option key={index} value={item.key}>{item.role}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="label-style">Contraseña:</label>
            <input
              type="text"
              value={password}
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-style">Activo:</label>
            <input
              type="checkbox"
              id="myCheckbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          </div>
          <button className="btn-saveChanges" onClick={saveNewUser}>
            Guardar Usuario
          </button>
          <button className="btn-closeModal" onClick={closeAddModal}>
            Cancelar
          </button>
        </Modal>

      </div>
      <div>
        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{getRoleName(user.role)}</td>
                <td>{user.active ? "Sí" : "No"}</td>
                <td>
                  <div className="users-actions">
                    <button onClick={() => deleteUser(index)} className="delete-btn"></button>
                    <button onClick={() => openModal(index)} className="edit-btn"></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <div className="btn-routes">

        <button onClick={openAddModal} className="btn-add-user">
          <img
            src={icon}
            alt="Icon Add User"
            className="Icon-Add-User"
          />
          Nuevo
        </button>
        <Link
          to="/products"
          className={`nav-button ${productosMatch ? "active-button" : ""}`}
        >
          Ir a Productos
        </Link>


      </div>
      {/* Modal para editar usuario */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Usuario"
        className="custom-modal-edituser"
      >
        <h1 className="h1Users">Editar Usuario</h1>
        <div className="form-group">
          <label className="label-style">Nombre:</label>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="label-style">Correo:</label>
          <input
            type="text"
            value={email}
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="label-style">Rol:</label>
          <select
            value={role}
            onChange={(e) => setRol(e.target.value)}
            className="input-field"
          >
            {getRoles().map((item, index) => <option key={index} value={item.key}>{item.role}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="label-style">Contraseña:</label>
          <input type="text"
            value={password}
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="label-style">Activo:</label>
          <input
            type="checkbox"
            id="myCheckboxEdit"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
        </div>
        <button className="btn-saveChanges" onClick={saveChanges}>Guardar Cambios</button>
        <button className="btn-closeModal" onClick={closeModal}>Cancelar</button>
      </Modal>
    </div>
  );
}
