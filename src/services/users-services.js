import { getAuthorizationHeader } from './auth-services';
const BASE_URL = import.meta.env.VITE_APP_API_URL;

// Función para agregar un nuevo usuario
export async function addUserToBackend(newUserData) {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthorizationHeader()
      },
      body: JSON.stringify(newUserData),
    });

    if (response.ok) {
      // La inserción fue exitosa
      const newUser = await response.json();
      return newUser; 
    } else {
      // Hubo un error en la inserción
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

}

