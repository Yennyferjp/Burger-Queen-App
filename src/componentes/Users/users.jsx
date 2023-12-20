import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import style from "./users.module.css";
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
    if (users && users[index]) {
      const user = users[index];
      setName(user.name || "");
      setEmail(user.email || "");
      setRol(user.role || "Administrador");
      setPassword(user.password || "");
      setActive(user.active || true);
    } else {
      // Manejar el caso en el que el usuario no se encuentra
      setName("");
      setEmail("");
      setRol("Administrador");
      setPassword("");
      setActive(true);
    }
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
        customClass: {
          title: 'swal-title',
        }
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
          customClass: {
            title: 'swal-title',
          }
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
          customClass: {
            title: 'swal-title',
          }
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
        customClass: {
          title: 'swal-title',
        }
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
        customClass: {
          title: 'swal-title',
        }
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
          customClass: {
            title: 'swal-title',
          }
        });
      } else {
        // Si no estamos en modo de edición, agrega el nuevo usuario
        setUsers([...users, newUser]);

        Swal.fire({
          icon: "success",
          title: "Usuario Agregado",
          text: "El usuario ha sido agregado exitosamente.",
          customClass: {
            title: 'swal-title',
          }
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
        customClass: {
          title: 'swal-title',
        }
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
    Swal.fire({
      title: "¿Confirmas eliminar un usuario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E02181",
      cancelButtonColor: "#442140",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      reverseButtons: true,
      customClass: {
        title: 'swal-title',
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Eliminar el usuario en el backend
          await deleteUserFromBackend(userId);

          // Actualizar la lista de usuarios localmente
          const updatedUsers = users.filter((user) => user._id !== userId);
          setUsers(updatedUsers);

          Swal.fire({
            icon: "success",
            title: "Usuario Eliminado",
            text: "El usuario ha sido eliminado exitosamente.",
            customClass: {
              title: 'swal-title',
            }
          });
        } catch (error) {
          console.error("Error al eliminar usuario", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al eliminar el usuario.",
            customClass: {
              title: 'swal-title',
            }
          });
        }
      }
    });
  }

  // Realiza la redirección a la ruta de login cuando se hace clic en "Salir"
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  const usersMatch = useMatch("/users");
  const productsMatch = useMatch("/products");

  // Renderizar la interfaz de usuario
  return (
    <div>
      {/* Navbar */}
      <div className={style.navbarUser}>
        <nav>
          <div className={style.navbarLeft}>
            <img
              src={logout}
              alt="logout"
              className={style.navbarLogout} onClick={handleLogoutClick}
            />
            <p className={style.navbarLogout} onClick={handleLogoutClick} >
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
        </nav>
      </div>
      <div>
        <div className={style.navCategories}>
          <Link
            to="/users"
            className={`${style['navButton']} ${usersMatch !== null ? style['activeButton'] : ''}`}
          >Usuarios
          </Link>
          <Link
            to="/products"
            className={`${style['navButton']} ${productsMatch !== null ? style['activeButton'] : ''}`}
          >Productos
          </Link>
        </div>

        <h1 className={style.h1Users}>Gestión de Usuarios</h1>
        {/* Modal para agregar usuario */}
        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          contentLabel="Agregar Usuario"
          className={style.customModalAddUser}
          ariaHideApp={true}
        >
          {/* Botón "x" para cerrar el modal */}
          <button className={style.closeModalButton} onClick={closeAddModal}>
            &times;
          </button>
          <h1 className={style.h1UsersModal}>Agregar Usuario</h1>
          <div className={style.formGroup}>
            <label className={style.labelStyle}>Nombre:</label>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={style.inputField}
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.labelStyle}>Correo:</label>
            <input
              type="text"
              value={email}
              placeholder="Correo"
              onChange={(e) => setEmail(e.target.value)}
              className={style.inputField}
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.labelStyle}>Rol:</label>
            <select
              value={role}
              onChange={(e) => setRol(e.target.value)}
              className={style.inputField}
            > <option value="">Selecciona una opción</option>
              {getRoles().map((item, index) =>
                <option key={index} value={item.key}>
                  {item.role}
                </option>)}
            </select>
          </div>
          <div className={style.formGroup}>
            <label className={style.labelStyle}>Contraseña:</label>
            <input
              type="text"
              value={password}
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              className={style.inputField}
            />
          </div>
          <div>
            <label className={style.labelStyle}>Activo:</label>
            <input
              type="checkbox"
              id="myCheckbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          </div>
          <button className={style.btnSaveChanges} onClick={saveNewUser}>
            Guardar
          </button>

        </Modal>
      </div>
      <div>
        <table className={style.usersTable}>
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
              <tr key={index} className={index % 2 === 0 ? style.evenRow : style.oddRow}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{getRoleName(user.role)}</td>
                <td>{user.active ? "Sí" : "No"}</td>
                <td>
                  <div className={style.usersActions}>
                    <button onClick={() => deleteUser(user._id)} className={style.deleteBtn}></button>
                    <button onClick={() => openModal(index)} className={style.editBtn}></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <div className={style.btnRoutes}>

        <button onClick={openAddModal} className={style.btnAddUser}>
          <img
            src={icon}
            alt="Icon Add User"
            className={style.IconAddUser}
          />
          Nuevo
        </button>
      </div>
      {/* Modal para editar usuario */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Usuario"
        className={style.customModalEditUser}
      >
        {/* Botón "x" para cerrar el modal */}
        <button className={style.closeModalButton} onClick={closeModal}>
          &times;
        </button>
        <h1 className={style.h1UsersModal}>Editar Usuario</h1>
        <div className={style.formGroup}>
          <label className={style.labelStyle}>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={style.inputField}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.labelStyle}>Correo:</label>
          <input
            type="text"
            value={email}
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            className={style.inputField}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.labelStyle}>Rol:</label>
          <select
            value={role}
            onChange={(e) => setRol(e.target.value)}
            className={style.inputField}
          >
            {getRoles().map((item, index) => <option key={index} value={item.key}>{item.role}</option>)}
          </select>
        </div>

        <div className={style.formGroup}>
          <label className={style.labelStyle}>Contraseña:</label>
          <input type="text"
            value={password}
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className={style.inputField}
          />
        </div>
        <div>
          <label className={style.labelStyle}>Activo:</label>
          <input
            type="checkbox"
            id="myCheckboxEdit"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
        </div>
        <button className={style.btnSaveChanges} onClick={saveChanges}>Guardar</button>
      </Modal>
    </div>
  )
};
