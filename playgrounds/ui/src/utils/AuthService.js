import decode from 'jwt-decode';
import auth0 from 'auth0-js';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const GRAPHCOOL_ACCESS_TOKEN = 'graphcool_access_token';

const REDIRECT = 'http://localhost:8080/callback';
const SCOPE = 'openid email';

var auth = new auth0.WebAuth({
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: process.env.REACT_APP_AUTH0_API_IDENTIFIER,
    scope: SCOPE
  });
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  clearGraphCoolToken();
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getGraphCoolToken() {
  return localStorage.getItem(GRAPHCOOL_ACCESS_TOKEN);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function clearGraphCoolToken() {
  localStorage.removeItem(GRAPHCOOL_ACCESS_TOKEN);
}

// access_token と id_token を展開することを許可するヘルパー関数
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// access_token をローカルストレージから取得し、保存します
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function setGraphCoolToken(accessToken) {
  localStorage.setItem(GRAPHCOOL_ACCESS_TOKEN, accessToken);
}

// id_token をローカルストレージから取得し、保存します
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function isAccountExpired() {
  return isTokenExpired(clearGraphCoolToken()) || isTokenExpired(getAccessToken())
}