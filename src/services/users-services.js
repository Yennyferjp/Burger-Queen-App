import { getAuthorizationHeader } from './auth-services';
const BASE_URL = import.meta.env.VITE_APP_API_URL;

const userRoles = {
  admin: 'Administrador',
  chef: 'Cocinero',
  waiter: 'Mesero',
}


export function getRoleName(roleName){
  return userRoles[roleName];
}

export function getRoles(){
  const roles = [];
  for (const key in userRoles) {
      const role = userRoles[key];
      roles.push({ key, role })
  }
  return roles;
}

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

export async function getUsersFromBackend() {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthorizationHeader()
    },
  });

  if (response.ok) {
    const usersList = await response.json();
    return usersList;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}

export async function updateUserToBackend(userId, updatedUser) {
  try {
    // Realiza la solicitud PUT al servidor con el ID de usuario
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthorizationHeader()
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      const updatedUserData = await response.json();
      return updatedUserData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error); 
    }
  } catch (error) {
    throw new Error(`Error al actualizar el usuario en el backend: ${error.message}`);
  }
}


export async function deleteUserFromBackend(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthorizationHeader()
    },
  });

  if (response.ok) {
    return { message: 'Usuario eliminado exitosamente' };
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}


