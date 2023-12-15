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
  return getUserInfo(json.token);
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

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export function getUserInfo(token){
  token = token || getAccessToken();
  if(!token){
    throw new Error('No está autenticado');
  }
  const payload = parseJwt(token);
  return{ ...payload, token}
}