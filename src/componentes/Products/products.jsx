import React, { useState, useEffect, useRef } from "react";
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

const BASE_URL = import.meta.env.VITE_APP_API_URL;

Modal.setAppElement('#root');

export function Products() {
  // Estado para almacenar los productos creados
  const [products, setProducts] = useState([]);

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const productImageRef = useRef(null);

  useEffect(() => {  // se utiliza para manejar el ciclo de vida de la aplicación
    refreshProductsList();
  },
    []);

  const [editProductModalIsOpen, setEditProductModalIsOpen] = useState(false);
  const openEditProductModal = (index) => {
    setEditProductModalIsOpen(true);

    const product = products[index];
    setProductImage(product.productImage);
    setProductName(product.productName);
    setProductType(product.productType);
    setProductId(product.productId);
    setProductPrice(product.productPrice);
  };
  const closeEditProductModal = () => {
    setEditProductModalIsOpen(false);
  };

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };
  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const [isDetailsProductModalOpen, setDetailsProductModalOpen] = useState(false);
  const openDetailsProductModal = () => {
    setDetailsProductModalOpen(true);
  };
  const closeDetailsProductModal = () => {
    setDetailsProductModalOpen(false);
  };

  const clearProductModal = () => {
    setProductName("");
    setProductType("");
    setProductId("");
    setProductPrice("");
    setProductImage("");
  };

  const saveProductsChanges = async () => {
    if (productName === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nombre del producto es obligatorio",
        customClass: {
          title: 'swal-title',
        },
        textClass: 'swal-content',
      });
      return;
    }
    if (productType === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El tipo de producto es obligatorio",
        customClass: {
          title: 'swal-title',
        },
        textClass: 'swal-content',
      });
      return;
    }
    if (productPrice === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El precio del producto es obligatorio",
        customClass: {
          title: 'swal-title',
        },
        textClass: 'swal-content',
      });
      return;
    }

    let _productImage = null;
    let productImagePromise = null;
    if (!productImageRef?.current) {
      console.error("Error al cargar la imagen");
      return;
    }
    if (!productImageRef?.current.files[0]) {
      console.log("El usuario no seleccionó una imagen");
    } else {
      productImagePromise = new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsDataURL(productImageRef.current.files[0]);
        reader.onloadend = () => {
          resolve(reader.result);
        }
        reader.onerror = (error) => {
          reject(error);
        };
      })
    }
    _productImage = await productImagePromise;

    const editedProduct = {
      name: productName,
      type: productType,
      price: productPrice,
      image: _productImage
    };

    try {
      await updateProductToBackend(productId, editedProduct);
      refreshProductsList();

      Swal.fire({
        icon: "success",
        title: "Producto Editado",
        text: "El producto ha sido editado exitosamente.",
        customClass: {
          title: 'swal-title',
        },
        textClass: 'swal-content',
      });

      clearProductModal();
      closeEditProductModal();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha habido un error al editar el producto.",
        customClass: {
          title: 'swal-title',
        },
        textClass: 'swal-content',
      });
    }
  };

  const refreshProductsList = async () => {
    let productsList = await getProductsFromBackend();
    productsList = productsList.map(product => ({
      productImage: product.image,
      productName: product.name,
      productPrice: product.price,
      productId: product._id,
      productType: product.type,
    }));
    setProducts(productsList);
  }

  const addNewProduct = async () => {
    if (productName === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nombre del producto es obligatorio",
        customClass: {
          title: 'swal-title',
        },
        textClass: 'swal-content',
      });
      return;
    }
    if (productType === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El tipo de producto es obligatorio",
        customClass: {
          title: 'swal-title',
        },
        textClass: 'swal-content',
      });
      return;
    }
    if (productPrice === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El precio del producto es obligatorio",
        customClass: {
          title: 'swal-title',
        },
        textClass: 'swal-content',
      });
      return;
    }

    let _productImage = null;
    let productImagePromise = null;
    if (!productImageRef?.current) {
      console.error("Error al cargar la imagen");
      return;
    }
    if (!productImageRef?.current.files[0]) {
      console.log("El usuario no seleccionó una imagen");
    } else {
      productImagePromise = new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsDataURL(productImageRef.current.files[0]);
        reader.onloadend = () => {
          resolve(reader.result);
        }
        reader.onerror = (error) => {
          reject(error);
        };
      })
    }
    _productImage = await productImagePromise;

    const newProduct = {
      name: productName,
      type: productType,
      price: productPrice,
      image: _productImage,
    };

    try {
      const savedProduct = await addProductToBackend(newProduct);
      refreshProductsList();

      Swal.fire({
        icon: "success",
        title: "Producto Agregado",
        text: "El producto ha sido agregado exitosamente.",
        customClass: {
          title: 'swal-title',
        },
        textClass: 'swal-content',
      });

      clearProductModal();
      closeEditProductModal();

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha habido un error al agregar el producto.",
        customClass: {
          title: 'swal-title',
        },
        textClass: 'swal-content',
      });
    }
  };

  const deleteProduct = async (productId) => {
    Swal.fire({
      title: "¿Confirmas eliminar este producto?",
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
      },
      textClass: 'swal-content', // Aplicar el estilo de fuente al mensaje
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProductFromBackend(productId);
          refreshProductsList();

          Swal.fire({
            icon: "success",
            title: "Producto Eliminado",
            text: "El producto ha sido eliminado exitosamente.",
            customClass: {
              title: 'swal-title',
            },
            textClass: 'swal-content',
          });

        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha habido un error al eliminar el producto.",
            customClass: {
              title: 'swal-title',
            },
            textClass: 'swal-content',
          });
        }
      }
    });
  }

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
  };

  const usuariosMatch = useMatch("/users");
  const orderMatch = useMatch("/order");

  return (
    <div>
      <div className="navbar-products">
        <nav>
          <div className="navbar-left">
            <img
              src={logout}
              alt="logout"
              className="navbar-image-logout"
            />
            <p className="navbar-logout" onClick={handleLogoutClick}>
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
      <div>

        <h1 className="h1Products">Gestión de Productos</h1>

        {/* Modal para agregar producto */}
        <Modal
          isOpen={isAddProductModalOpen}
          onRequestClose={closeAddProductModal}
          contentLabel="Agregar Producto"
          className="custom-modal-addProduct"
          ariaHideApp={true}
        >
          {/* Botón "x" para cerrar el modal */}
          <button className="close-modal-button" onClick={closeAddProductModal}>
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
              <option value="">Selecciona una opción</option>
              {getTypes().map((item, index) =>
                <option key={index} value={item.key}>
                  {item.type}
                </option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="label-style">Imagen:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
              className="input-field"
              ref={productImageRef}
            />
            {/* <span class="file-name">Ningún archivo seleccionado</span> */}
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
                    <button onClick={() => openEditProductModal(index)} className="edit-btn"></button>
                    <button onClick={() => openDetailsProductModal(index)} className="details-btn"></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn-routes">
        <button onClick={openAddProductModal} className="btn-add-product">
          <img
            src={iconAdd}
            alt="Icon add Product"
            className="Icon-Add-Product"
          />
          Nuevo
        </button>
        <Link
          to="/order"
          className={`nav-button ${orderMatch ? "active-button" : ""}`}
        >Ir a Órdenes
        </Link>
        <Link
          to="/users"
          className={`nav-button ${usuariosMatch ? "active-button" : ""}`}
        >Ir a Usuarios
        </Link>
      </div>

      {/* Modal para editar producto */}

      <Modal
        isOpen={editProductModalIsOpen}
        onRequestClose={closeEditProductModal}
        contentLabel="Editar producto"
        className="custom-modal-editProduct"
      >
        <button className="close-modal-button" onClick={closeEditProductModal}>
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
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="input-field"
          >
            {getTypes().map((item, index) => <option key={index} value={item.key}>{item.type}</option>)}
          </select>
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
        <div className="form-group">
          <label className="label-style">Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            className="input-field"
            ref={productImageRef}
          />
        </div>
        <button className="btn-saveChanges" onClick={saveProductsChanges}>Guardar</button>
      </Modal>

      {/* Modal para ver detalles del producto */}
      <Modal
        isOpen={isDetailsProductModalOpen}
        onRequestClose={closeDetailsProductModal}
        contentLabel="Detalles del producto"
        className="custom-modal-detailsProduct"
        ariaHideApp={true}
      >
        <button className="close-modal-button" onClick={closeDetailsProductModal}>
          &times;
        </button>
        <h1 className="h1Products">Detalles del producto</h1>
        <img
          src={logo}
          className="product-image" // cambiar por la del producto
        />
        <div className="form-group">
          <label className="label-style">Nombre:</label>
          <span className="product-details">
            {productName}
          </span>
        </div>
        <div className="form-group">
          <label className="label-style">Tipo:</label>
          <span className="product-details">
            {productType}
          </span>
        </div>
        <div className="form-group">
          <label className="label-style">Precio:</label>
          <span className="product-details">
            {productPrice}
          </span>
        </div>
      </Modal>
    </div>
  );
}
// <img src={`${BASE_URL}${product.productImage}`}/>