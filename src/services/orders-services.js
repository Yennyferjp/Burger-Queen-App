import { getAuthorizationHeader } from './auth-services';
const BASE_URL = import.meta.env.VITE_APP_API_URL;

// Función para agregar crear una orden
export async function createOrderToBackend(order) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthorizationHeader()
      },
      body: JSON.stringify(order),
    });
    if (response.ok) {
      // La creación de la orden fue exitosa
      const newOrder = await response.json();
      return newOrder;
    } else {
      // Hubo un error en la creación de la orden
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error('Error al crear la orden: ', error);
    throw error;
  }
}

export async function getOrdersFromBackend() {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthorizationHeader()
      },
    });
    if (response.ok) {
      const orders = await response.json();
      return orders; 
    } else {
      const errorData = await response.json();
      console.error('Error al obtener órdenes:', errorData.message);
      return []; 
    }
  } catch (error) {
    console.error('Error inesperado:', error);
    return []; 
  }
}

export async function updateOrderToBackend(orderId, updatedOrderData) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthorizationHeader() 
      },
      body: JSON.stringify(updatedOrderData),
    });

    if (response.ok) {
      const result = await response.json();
      return result; 
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteOrderToBackend(orderId) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthorizationHeader() 
      },
    });

    if (response.ok) {
      return true; 
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
}
