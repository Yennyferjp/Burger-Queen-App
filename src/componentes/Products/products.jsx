import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";


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

  const saveProductsChanges = () => {
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

    if (editingProduct !== null) {
      const newProducts = [...products];
      newProducts[editingProduct] = newProduct;
      setProducts(newProducts);

      Swal.fire({
        icon: "success",
        title: "Producto Editado",
        text: "El producto ha sido editado exitosamente.",
      });
    } else {
      setProducts([...products, newProduct]);
    }

    setProductName("");
    setProductType("");
    setProductId("");
    setProductPrice("");
    closeProductModal();
  };

  const addNewProduct = () => {
    if (productName === "" || productType === "" || productId === "" || productPrice === "") {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }

    const newProduct = {
      productName,
      productType,
      productId,
      productPrice
    };

    if (editingProduct !== null) {
      // Si estamos en modo de edición, actualiza el producto seleccionado
      const newProducts = [...products];
      newProducts[editingProduct] = newProduct;
      setProducts(newProducts);

      Swal.fire({
        icon: "success",
        title: "Producto Añadido",
        text: "El producto ha sido editado exitosamente.",
      });
    } else {
      setProducts([...products, newProduct]);

      Swal.fire({
        icon: "success",
        title: "Producto Agregado",
        text: "El producto ha sido agregado exitosamente.",
      });
    }

    setProductName("");
    setProductType("");
    setProductId("");
    setProductPrice("");
    closeProductModal();
  };

  const deleteProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  }


  return (
    <div>
      <button onClick={() => window.location.href = "/productos"}>Productos</button>
      <button onClick={() => window.location.href = "/usuarios"}>Usuarios</button>
      <div>
        <h1>Gestión de Productos</h1>
        <div>
          <input type="text"
            placeholder="Nombre del producto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div>
          <input type="text"
            placeholder="Tipo"
            value={productType}
            onChange={(e) => setProductType(e.target.value)} />
        </div>
        <div>
          <input type="text"
            placeholder="ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)} />
        </div>
        <div>
          <input type="text"
            placeholder="Precio"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)} />
        </div>
        <button onClick={addNewProduct}>Agregar</button>
      </div>
      <div>
        <h2>Lista de Productos</h2>
        <table>
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
              <tr key={index}>
                <td>{product.productName}</td>
                <td>{product.productType}</td>
                <td>{product.productId}</td>
                <td>{product.productPrice}</td>
                <td>
                  <button onClick={() => deleteProduct(index)}>Eliminar</button>
                  <button onClick={() => openProductModal(index)}>Editar</button>
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
