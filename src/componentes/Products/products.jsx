import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./products.css";
import { Link, useMatch } from "react-router-dom";
import {
  addProductToBackend,
  getProductsFromBackend,
  updateProductToBackend,
  deleteProductFromBackend,
  getTypeName,
  getTypes,
} from "../../services/products-services";

import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";
import iconAdd from "./images/add.png";

Modal.setAppElement('#root');

export function Products() {
  // Estado para almacenar los productos creados
  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productId, setProductId] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [productModalIsOpen, setProductModalIsOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {  // se utiliza para manejar el ciclo de vida de la aplicación
    refreshProductsList();
  },
    []);

  const openProductModal = (index) => {
    setEditingProduct(index);
    setProductModalIsOpen(true);

    const product = products[index];
    setProductName(product.productName);
    setProductType(product.productType);
    setProductId(product.productId);
    setProductPrice(product.productPrice);
  };

  const closeProductModal = () => {
    setEditingProduct(null);
    setProductModalIsOpen(false);
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const saveProductsChanges = async () => {
    if (productName === "" || productType === "" || productId === "" || productPrice === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios",
      });
      return;
    }

    const editedProduct = {
      name: productName,
      type: productType,
      price: productPrice
    };

    try {
      await updateProductToBackend(productId, editedProduct);
      refreshProductsList();

      Swal.fire({
        icon: "success",
        title: "Producto Editado",
        text: "El producto ha sido editado exitosamente.",
      });

      setProductName("");
      setProductType("");
      setProductId("");
      setProductPrice("");
      closeProductModal();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha habido un error al editar el producto.",
      });
    }
  };

  const refreshProductsList = async () => {
    let productsList = await getProductsFromBackend();
    productsList = productsList.map(product => ({
      productName: product.name,
      productPrice: product.price,
      productId: product._id,
      productType: product.type,
    }));
    setProducts(productsList);
  }

  const addNewProduct = async () => {
    if (productName === "" || productType === "" || productId === "" || productPrice === "") {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }

    const newProduct = {
      name: productName,
      type: productType,
      price: productPrice
    };

    try {
      const savedProduct = await addProductToBackend(newProduct);
      refreshProductsList();

      Swal.fire({
        icon: "success",
        title: "Producto Agregado",
        text: "El producto ha sido agregado exitosamente.",
      });

      setProductName("");
      setProductType("");
      setProductId("");
      setProductPrice("");
      closeProductModal();

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha habido un error al agregar el producto.",
      });
    }
  };

  const deleteProduct = async (productId) => {

    try {
      await deleteProductFromBackend(productId);
      refreshProductsList();

      Swal.fire({
        icon: "success",
        title: "Producto Eliminado",
        text: "El producto ha sido eliminado exitosamente.",
      });

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha habido un error al eliminar el producto.",
      });
    }
  }

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  const usuariosMatch = useMatch("/users");

  return (
    <div>
      <div className="navbar-products">
        <nav>
          <div className="navbar-products-left">
            <img
              src={logout}
              alt="logout"
              className="navbar-image-logout"
            />
            <p className="navbar-logout" onClick={handleLogoutClick}>
              Salir
            </p>
          </div>
          <div className="navbar-products-right">
            <img
              src={logo}
              alt="Imagen 2"
              className="navbar-image-logo"
            />
          </div>
        </nav>
      </div>
      <div>

        <h1 className="h1Products">Gestión de Productos</h1>

        {/* Modal para agregar producto */}
        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          contentLabel="Agregar Producto"
          className="custom-modal-addProduct"
          ariaHideApp={true}
        >
          {/* Botón "x" para cerrar el modal */}
          <button className="close-modal-button" onClick={closeAddModal}>
            &times;
          </button>
          <h1 className="h1Products">Agregar Producto</h1>
          <div className="form-group">
            <label className="label-style">Nombre:</label>
            <input
              type="text"
              placeholder="Nombre"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="label-style">Precio:</label>
            <input
              type="text"
              value={productPrice}
              placeholder="Precio"
              onChange={(e) => setProductPrice(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="label-style">Tipo:</label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="input-field"
            >
              {getTypes().map((item, index) => <option key={index} value={item.key}>{item.type}</option>)}
            </select>
          </div>
          <button className="btn-saveChanges" onClick={addNewProduct}>
            Guardar 
          </button>

        </Modal>
      </div>
      <div>

        <table className="products-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{product.productName}</td>
                <td>{product.productType}</td>
                <td>{product.productPrice}</td>
                <td>
                  <div className="products-actions">
                    <button onClick={() => deleteProduct(product.productId)} className="delete-btn"></button>
                    <button onClick={() => openProductModal(index)} className="edit-btn"></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn-routes">
        <button onClick={openAddModal} className="btn-add-product">
          <img
            src={iconAdd}
            alt="Icon add Product"
            className="Icon-Add-Product"
          />
          Nuevo
        </button>
        <Link
          to="/users"
          className={`nav-button ${usuariosMatch ? "active-button" : ""}`}
        >Ir a Usuarios
        </Link>
      </div>

      {/* Modal para editar producto */}

      <Modal
        isOpen={productModalIsOpen}
        onRequestClose={closeProductModal}
        contentLabel="Editar producto"
        className="custom-modal-editProduct"
      >
        <button className="close-modal-button" onClick={closeProductModal}>
          &times;
        </button>

        <h1 className="h1Products">Editar producto</h1>
        <div className="form-group">
          <label className="label-style">Nombre:</label>
          <input type="text"
            placeholder="Nombre"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="label-style">Tipo:</label>
          <input type="text"
            placeholder="Tipo"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="label-style">ID:</label>
          <input type="text"
            placeholder="ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="label-style">Precio:</label>
          <input type="text"
            placeholder="Precio"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="input-field"
          />
        </div>
        <button className="btn-saveChanges" onClick={saveProductsChanges}>Guardar</button>
      </Modal>
    </div>
  );
}
