import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./products.css";
import { Link, useMatch } from "react-router-dom";
import { addProductToBackend } from "../../services/products-services";

import logout from "./images/flecha-logout.png";
import logo from "./images/logo_bq.png";


export function Products() {
  // Estado para almacenar los productos creados
  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productId, setProductId] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [productModalIsOpen, setProductModalIsOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);


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

  const saveProductsChanges = async () => {
    if (productName === "" || productType === "" || productId === "" || productPrice === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios",
      });
      return;
    }

    const newProduct = {
      productName,
      productType,
      productId,
      productPrice
    };

    const newProducts = [...products];
    newProducts[editingProduct] = newProduct;
    setProducts(newProducts);

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
  };

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

  const deleteProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  }

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  const usuariosMatch = useMatch("/users");
  const productosMatch = useMatch("/products");

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
        <Link
          to="/users"
          className={`nav-button ${usuariosMatch ? "active-button" : ""}`}
        >Usuarios
        </Link>
        <Link
          to="/products"
          className={`nav-button ${productosMatch ? "active-button" : ""}`}
        > Productos
        </Link>
      </div>
      <div>
        <h1 className="h1Products">Gestión de Productos</h1>
        <div className="div-formulario-products">
          <div>
            <input type="text"
              placeholder="Nombre del producto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="input-products" />
          </div>
          <div>
            <input type="text"
              placeholder="ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="input-products" />
          </div>
          <div>
            <input type="text"
              placeholder="Precio"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="input-products" />
          </div>
          <div className="div-type-btn">
            <h2 className="h2-products">Elige el tipo</h2>
            <div>
              <select
                value={productType} onChange={(e) => setProductType(e.target.value)}
                className="input-products">
                <option value="Desayuno">Desayuno</option>
                <option value="Almuerzo">Almuerzo</option>
                <option value="Acompañamientos">Acompañamientos</option>
              </select>
            </div>
            <button onClick={addNewProduct}
              className="btn-add-product"
            >Agregar
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="h2-products">Lista de Productos</h2>
        <table className="products-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>ID</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{product.productName}</td>
                <td>{product.productType}</td>
                <td>{product.productId}</td>
                <td>{product.productPrice}</td>
                <td>
                  <div className="products-actions">
                    <button onClick={() => deleteProduct(index)} className="delete-btn"></button>
                    <button onClick={() => openProductModal(index)} className="edit-btn"></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={productModalIsOpen}
        onRequestClose={closeProductModal}
        contentLabel="Editar producto"
      >
        <h1>Editar producto</h1>
        <div>
          <label>Nombre:</label>
          <input type="text"
            placeholder="Nombre"
            value={productName}
            onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div>
          <label>Tipo:</label>
          <input type="text"
            placeholder="Tipo"
            value={productType}
            onChange={(e) => setProductType(e.target.value)} />
        </div>
        <div>
          <label>ID:</label>
          <input type="text"
            placeholder="ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)} />
        </div>
        <div>
          <label>Precio:</label>
          <input type="text"
            placeholder="Precio"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)} />
        </div>
        <button onClick={saveProductsChanges}>Guardar cambios</button>
        <button onClick={closeProductModal}>Cancelar</button>
      </Modal>
    </div>
  );
}
