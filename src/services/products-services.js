import { getAuthorizationHeader } from './auth-services';
const BASE_URL = import.meta.env.VITE_APP_API_URL;

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

