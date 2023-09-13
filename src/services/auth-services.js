const BASE_URL = import.meta.env.VITE_APP_API_URL;


export async function authorize(email, password) {
  
  removeAccessToken();

  const response = await fetch(`${BASE_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email, password
    })
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  setAccessToken(json.token);
  return json.token;
}

function setAccessToken(token) {
  localStorage.setItem('access_token', token);
}

function getAccessToken() {
  return localStorage.getItem('access_token');
}

function removeAccessToken() {
  localStorage.removeItem('access_token');
}

export function isAuthenticated() {
  return getAccessToken() !== null;
}

export function getAuthorizationHeader() {
  return `Bearer ${getAccessToken()}`;
}

