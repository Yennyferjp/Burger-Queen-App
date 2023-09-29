import React, { useState, useEffect } from 'react';
import style from './ProductMenu.module.css';
import { getProductsFromBackend } from '../../services/products-services'
function ProductMenu({ addProductToOrder }) {

  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Desayuno'); // Estado para la categoría activa

  // Filtra los productos según la categoría activa
  const filterProducts = (type) => {
    getProductsFromBackend(type).then((result) => setProducts(result));
  }
  const changeActiveCategory = (category) => {
    setActiveCategory(category);
    filterProducts(category);
  }
  useEffect(() => {  // se utiliza para manejar el ciclo de vida de la aplicación
    filterProducts(activeCategory);
  },
    []);

  return (
    <div className={style.content}>
      <div className={style.menu}>
        <div className="categories">
          <button
            className={`${style['btn-breakfast']} ${activeCategory === 'Desayuno' ? 'active' : ''}`}
            onClick={() => changeActiveCategory('Desayuno')}
          >
            DESAYUNO
          </button>
          <button
            className={`${style['btn-lunch']} ${activeCategory === 'Almuerzo' ? 'active' : ''}`}
            onClick={() => changeActiveCategory('Almuerzo')}
          >
            ALMUERZO
          </button>
        </div>
        <div className="product-menu">
        <div className="product-list">
          {products.map((product, index) => (
            <div key={index} className={style.productCard} onClick={() => addProductToOrder(product)}>
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>Precio: ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
      
    </div>
  );
}

export default ProductMenu;