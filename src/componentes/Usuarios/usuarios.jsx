import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";

export function Usuarios() {
    // Estado para almacenar los usuarios creados
    const [usuarios, setUsuarios] = useState([]);

    // Estado para gestionar los valores de los campos del formulario
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [activo, setActivo] = useState(true); // Por defecto, activo

    // Estado para gestionar la apertura y cierre del modal
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Estado adicional para el usuario seleccionado en modo edición con modal
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    // Función para abrir el modal de edición con los datos del usuario seleccionado
    const abrirModal = (index) => {
        setUsuarioEditando(index);
        setModalIsOpen(true);

        // Obtener los datos del usuario seleccionado
        const usuario = usuarios[index];
        setNombre(usuario.nombre);
        setCorreo(usuario.correo);
        setRol(usuario.rol);
        setContraseña(usuario.contraseña);
        setActivo(usuario.activo);
    };

    // Función para cerrar el modal de edición
    const cerrarModal = () => {
        setUsuarioEditando(null);
        setModalIsOpen(false);
    };

    const guardarCambios = () => {
        if (nombre === "" || correo === "" || rol === "" || contraseña === "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Todos los campos son obligatorios",
            });
            return;
        }

        const nuevoUsuario = {
            nombre,
            correo,
            rol,
            contraseña,
            activo,
        };

        if (usuarioEditando !== null) {
            const nuevosUsuarios = [...usuarios];
            nuevosUsuarios[usuarioEditando] = nuevoUsuario;
            setUsuarios(nuevosUsuarios);

            Swal.fire({
                icon: "success",
                title: "Usuario Editado",
                text: "El usuario ha sido editado exitosamente.",
            });
        } else {
            setUsuarios([...usuarios, nuevoUsuario]);
        }

        setNombre("");
        setCorreo("");
        setRol("");
        setContraseña("");
        setActivo(true);
        cerrarModal();
    };

    // Función para agregar un nuevo usuario a la lista
    const agregarUsuario = () => {
        if (nombre === "" || correo === "" || rol === "" || contraseña === "") {
            // Utiliza SweetAlert2 para mostrar una notificación de error
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Todos los campos son obligatorios",
            });
            return;
        }

        // Crear un nuevo objeto de usuario
        const nuevoUsuario = {
            nombre,
            correo,
            rol,
            contraseña,
            activo,
        };

        if (usuarioEditando !== null) {
            // Si estamos en modo de edición, actualiza el usuario seleccionado
            const nuevosUsuarios = [...usuarios];
            nuevosUsuarios[usuarioEditando] = nuevoUsuario;
            setUsuarios(nuevosUsuarios);

            Swal.fire({
                icon: "success",
                title: "Usuario Editado",
                text: "El usuario ha sido editado exitosamente.",
            });
        } else {
            // Si no estamos en modo de edición, agrega el nuevo usuario
            setUsuarios([...usuarios, nuevoUsuario]);

            Swal.fire({
                icon: "success",
                title: "Usuario Agregado",
                text: "El usuario ha sido agregado exitosamente.",
            });
        }

        // Limpiar los campos del formulario
        setNombre("");
        setCorreo("");
        setRol("");
        setContraseña("");
        setActivo(true);

        // Cerrar el modal
        cerrarModal();
    };

    // Función para eliminar un usuario de la lista
    const eliminarUsuario = (index) => {
        const nuevosUsuarios = [...usuarios];
        nuevosUsuarios.splice(index, 1);
        setUsuarios(nuevosUsuarios);
    }

    // Renderizar la interfaz de usuario
    return (
        <div>
            <button onClick={() => window.location.href = "/usuarios"}>Usuarios</button>
            <button onClick={() => window.location.href = "/productos"}>Productos</button>
            <div>
                <h1>Gestión de Usuarios</h1>
                <div>
                    <input type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div>
                    <input type="text"
                        value={correo}
                        placeholder="Correo"
                        onChange={(e) => setCorreo(e.target.value)} />
                </div>
                <div>
                    <input type="text"
                        value={rol}
                        placeholder="Rol"
                        onChange={(e) => setRol(e.target.value)} />
                </div>
                <div>
                    <input type="password"
                        value={contraseña}
                        placeholder="Contraseña"
                        onChange={(e) => setContraseña(e.target.value)} />
                </div>
                <div>
                    <label>Activo:</label>
                    <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
                </div>
                <button onClick={agregarUsuario}>Agregar</button>
            </div>
            <div>
                <h2>Lista de Usuarios</h2>
                <table>
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
                        {usuarios.map((usuario, index) => (
                            <tr key={index}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.rol}</td>
                                <td>{usuario.activo ? "Sí" : "No"}</td>
                                <td>
                                    <button onClick={() => eliminarUsuario(index)}>Eliminar</button>
                                    <button onClick={() => abrirModal(index)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para editar usuario */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={cerrarModal}
                contentLabel="Editar Usuario"
            >
                <h1>Editar Usuario</h1>
                <div>
                <label>Nombre:</label>
                    <input type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div>
                <label>Correo:</label>
                    <input type="text"
                        value={correo}
                        placeholder="Correo"
                        onChange={(e) => setCorreo(e.target.value)} />
                </div>
                <div>
                <label>Rol:</label>
                    <input type="text"
                        value={rol}
                        placeholder="Rol"
                        onChange={(e) => setRol(e.target.value)} />
                </div>
                <div>
                <label>Contraseña:</label>
                    <input type="text"
                        value={contraseña}
                        placeholder="Contraseña"
                        onChange={(e) => setContraseña(e.target.value)} />
                </div>
                <div>
                    <label>Activo:</label>
                    <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
                </div>
                <button onClick={guardarCambios}>Guardar Cambios</button>
                <button onClick={cerrarModal}>Cancelar</button>
            </Modal>
        </div>
    );
}