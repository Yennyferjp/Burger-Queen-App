import { getAuthorizationHeader } from './auth-services';
const BASE_URL = import.meta.env.VITE_APP_API_URL;

const productTypes = {
  lunch: 'Almuerzo',
  breakfast: 'Desayuno',
  accompaniments: 'Acompañamientos',
}

export function getTypeName(productType){
  return productTypes[productType];
}

export function getTypes(){
  const types = [];
  for (const key in productTypes) {
      const type = productTypes[key];
      types.push({ key, type })
  }
  return types;
}

// Función para agregar un nuevo producto
export async function addProductToBackend(newProductData) {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthorizationHeader()
      },
      body: JSON.stringify(newProductData),
    });

    if (response.ok) {
      // La inserción fue exitosa
      const newProduct = await response.json();
      return newProduct; 
    } else {
      // Hubo un error en la inserción
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
}

export async function getProductsFromBackend(type) {
  var url = `${BASE_URL}/products`;
  if(type){
    url+= `?type=${type}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthorizationHeader()
    },
  });

  if (response.ok) {
    const productsList = await response.json();
    return productsList; 
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}

export async function updateProductToBackend(productId, editedProduct) {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthorizationHeader()
    },
    body: JSON.stringify(editedProduct),
  });

  if (response.ok) {
    const updatedProduct = await response.json();
    return updatedProduct; 
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}

export async function deleteProductFromBackend(productId) {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthorizationHeader()
    },
  });

  if (response.ok) {
    const deletedProduct = await response.json();
    return deletedProduct;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}
