import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import style from "./products.module.css";
import { useNavigate } from "react-router-dom";
import { Link, useMatch } from "react-router-dom";
import {
  addProductToBackend,
  getProductsFromBackend,
  updateProductToBackend,
  deleteProductFromBackend,
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
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const productImageRef = useRef(null);

  useEffect(() => {  // se utiliza para manejar el ciclo de vida de la aplicación
    refreshProductsList();
  },
    []);

  const [editProductModalIsOpen, setEditProductModalIsOpen] = useState(false);
  const openEditProductModal = (index) => {
    const product = products[index];
    setProductImage(product.productImage);
    setProductName(product.productName);
    setProductType(product.productType);
    setProductId(product.productId);
    setProductPrice(product.productPrice);

    setEditProductModalIsOpen(true);
  };
  const closeEditProductModal = () => {
    setEditProductModalIsOpen(false);
    clearProductModal();
  };

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };
  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
    clearProductModal();
  };

  const [isDetailsProductModalOpen, setDetailsProductModalOpen] = useState(false);
  const openDetailsProductModal = (index) => {
    const product = products[index];
    setProductName(product.productName);
    setProductType(product.productType);
    setProductId(product.productId);
    setProductPrice(product.productPrice);
    setProductImage(product.productImage);

    setDetailsProductModalOpen(true);
  };
  const closeDetailsProductModal = () => {
    setDetailsProductModalOpen(false);
  };

  const clearProductModal = () => {
    setProductName("");
    setProductType("");
    setProductId("");
    setProductPrice(0);
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

      closeAddProductModal();

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  const usersMatch = useMatch("/users");
  const productsMatch = useMatch("/products");

  return (
    <div>
      <div className={style.navbar}>
        <div className={style.navProducts}>
          <div className={style.navbarLeft}>
            <img
              src={logout}
              alt="logout"
              className={style.navbarImageLogout}
            />
            <p className={style.navbarLogout} onClick={handleLogoutClick}>
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
        </div>
      </div>
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
      <div>
        <h1 className={style.h1Products}>Gestión de Productos</h1>

        {/* Modal para agregar producto */}
        <Modal
          isOpen={isAddProductModalOpen}
          onRequestClose={closeAddProductModal}
          contentLabel="Agregar Producto"
          className={style.customModalAddProduct}
          ariaHideApp={true}
        >
          {/* Botón "x" para cerrar el modal */}
          <button className={style.closeModalButton} onClick={closeAddProductModal}>
            &times;
          </button>
          <h1 className={style.h1ProductsModal}>Agregar Producto</h1>
          <div className={style.formGroup}>
            <label className={style.labelStyle}>Nombre:</label>
            <input
              type="text"
              placeholder="Nombre"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={style.inputField}
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.labelStyle}>Precio:</label>
            <input
              type="number"
              value={productPrice}
              placeholder="Precio"
              onChange={(e) => setProductPrice(new Number(e.target.value))}
              className={style.inputField}
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.labelStyle}>Tipo:</label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className={style.inputField}
            >
              <option value="">Selecciona una opción</option>
              {getTypes().map((item, index) =>
                <option key={index} value={item.key}>
                  {item.type}
                </option>)}
            </select>
          </div>
          <div className={style.formGroup}>
            <label className={style.labelStyle} htmlFor="fileInput">
              Imagen:
            </label>
            <div className={style.customFileContainer}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="fileInput"
                style={{ display: 'none' }}
              />
              <label htmlFor="fileInput" className={style.customFileUploadAdd}>
              {productImage ? 'Archivo seleccionado' : 'Seleccionar archivo'}
              </label>
              {productImage && (
                <div className={style.imgName}>{productImage.name}</div>
              )}
            </div>
          </div>

          <button className={style.btnSaveChanges} onClick={addNewProduct}>
            Guardar
          </button>

        </Modal>
      </div>
      <div className={style.listProducts}>

        <table className={style.productsTable}>
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
              <tr key={index} className={index % 2 === 0 ? style.evenRow : style.oddRow}>
                <td>{product.productName}</td>
                <td>{product.productType}</td>
                <td>{product.productPrice}</td>
                <td>
                  <div className={style.productsActions}>
                    <button onClick={() => deleteProduct(product.productId)} className={style.deleteBtn}></button>
                    <button onClick={() => openEditProductModal(index)} className={style.editBtn}></button>
                    <button onClick={() => openDetailsProductModal(index)} className={style.detailsBtn}></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={style.btnRoutes}>
        <button onClick={openAddProductModal} className={style.btnAddProduct}>
          <img
            src={iconAdd}
            alt="Icon add Product"
            className={style.IconAddProduct}
          />
          Nuevo
        </button>
      </div>

      {/* Modal para editar producto */}

      <Modal
        isOpen={editProductModalIsOpen}
        onRequestClose={closeEditProductModal}
        contentLabel="Editar producto"
        className={style.customModalEditProduct}
      >
        <button className={style.closeModalButton} onClick={closeEditProductModal}>
          &times;
        </button>

        <h1 className={style.h1ProductsModal}>Editar producto</h1>
        <div className={style.formGroup}>
          <label className={style.labelStyle}>Nombre:</label>
          <input type="text"
            placeholder="Nombre"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className={style.inputField}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.labelStyle}>Tipo:</label>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className={style.inputField}
          >
            {getTypes().map((item, index) => <option key={index} value={item.key}>{item.type}</option>)}
          </select>
        </div>
        <div className={style.formGroup}>
          <label className={style.labelStyle}>ID:</label>
          <input type="text"
            placeholder="ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className={style.inputField}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.labelStyle}>Precio:</label>
          <input type="text"
            placeholder="Precio"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className={style.inputField}
          />
        </div>
        <div className={style.formGroup}>
            <label className={style.labelStyle} htmlFor="fileInput">
              Imagen:
            </label>
            <div className={style.customFileContainer}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="fileInput"
                style={{ display: 'none' }}
              />
              <label htmlFor="fileInput" className={style.customFileUploadEdit}>
              {productImage ? 'Archivo seleccionado' : 'Seleccionar archivo'}
              </label>
              {productImage && (
                <div className={style.imgName}>{productImage}</div>
              )}
            </div>
          </div>
        <button className={style.btnSaveChanges} onClick={saveProductsChanges}>Guardar</button>
      </Modal>

      {/* Modal para ver detalles del producto */}
      <Modal
        isOpen={isDetailsProductModalOpen}
        onRequestClose={closeDetailsProductModal}
        contentLabel="Detalles del producto"
        className={style.customModalDetailsProduct}
        ariaHideApp={true}
      >
        <button className={style.closeModalButton} onClick={closeDetailsProductModal}>
          &times;
        </button>
        <h1 className={style.h1ProductsModal}>Detalles del producto</h1>
        <img
          src={`${BASE_URL}${productImage}`}
          className={style.productImage} // cambiar por la del producto
        />
        <div className={style.formGroup}>
          <label className={style.labelStyle}>Nombre:</label>
          <span className={style.productDetails}>
            {productName}
          </span>
        </div>
        <div className={style.formGroup}>
          <label className={style.labelStyle}>Tipo:</label>
          <span className={style.productDetails}>
            {productType}
          </span>
        </div>
        <div className={style.formGroup}>
          <label className={style.labelStyle}>Precio:</label>
          <span className={style.productDetails}>
            {productPrice}
          </span>
        </div>
      </Modal>
    </div>
  );
}
