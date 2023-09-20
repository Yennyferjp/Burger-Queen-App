# Changelog

## 1.0.0 - 2023-09-20

### Sprint learnings

- Métodos GET, POST, PUT, DELETE.
- Hook useEffect.
- Conexión de la interfaz del usuario con el servidor de la aplicación web.
- Configuración de modales en React.


### Added

- Configuracion del elemento raíz para los modales en React con Modal.setAppElement() POST.
- Funciones de autenticación y manejo de tokens de acceso.
- Estilos CSS para el formulario de agregar usuarios (modal).
- Incorporación de imágenes para los iconos de los botones.
- Configuración products-services para que los datos ingresados en la interfaz se reflejen en la base de datos.
- Swal para mostrar error al agregar productos.
- Actualización de la tabla en la interfaz para agregar un producto (GET).
- Función refreshProductsList para mostrar los productos cada que hay una actualización.
- Uso de useEffect para mostrar los productos al actualizar la interfaz.
- Función para editar productos en la interfaz (PUT).
- Funcionalidad para eliminar productos para que se reflejen en base de datos (DELETE).
- Funciones de gestión de usuarios y roles, getUsersFromBackend() y updateUserToBackend().
- Aplicación de funciones asincrónicas con el backend (GET y PUT).


### Fixed

- Corrección de la función deleteUser para eliminar usuarios correctamente.

### Changed

- Mejoras en la autenticación y estilo del componente de inicio de sesión.
- Mejoras en estilos CSS para el formulario de inicio de sesión y el botón "Continuar".
- Mejoras en la interfaz de usuario y gestión de usuarios.
- Renovación de estilos CSS de los componentes Users y Products.
- Edición en modal para editar usuarios y productos.

### Removed

- Sustitución de inputs para añadir usuarios o productos por un modal.