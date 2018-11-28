import decode from 'jwt-decode';
import { GraphQLClient } from 'graphql-request'

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const GRAPHCOOL_ACCESS_TOKEN = 'graphcool_access_token';
const GRAPHCOOL_USER = 'graphcool_user';

const client = new GraphQLClient(process.env.REACT_APP_GRAPHCOOL_SIMPLE_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GRAPHCOOL_API_KEY}`,
  },
})

export function logout() {
  clearIdToken();
  clearAccessToken();
  clearGraphCoolToken();
}

export async function getGraphcoolUser() {
  const { userId } = getDecodedGraphcoolToken()

  const userQuery = `{
    User(id: "${ userId }") {
      id
      email
      role
    }
  }`

  const user = (await client.request(userQuery)).User
  return user
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

export function getMe() {
  return JSON.parse(localStorage.getItem(GRAPHCOOL_USER))
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

function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function setGraphCoolToken(accessToken) {
  localStorage.setItem(GRAPHCOOL_ACCESS_TOKEN, accessToken);
}

export function setGraphCoolUser(user) {
  localStorage.setItem(GRAPHCOOL_USER, JSON.stringify(user));
}

export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export async function isAuthorized() {
  return ((await getGraphcoolUser()).role === "ADMIN")
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken)
}

export function getDecodedGraphcoolToken() {
  return decode(getGraphCoolToken())
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