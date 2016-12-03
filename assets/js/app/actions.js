import * as types from "./actionTypes";

export function logIn(name, password) {
  return {
    type: types.AUTH_LOGIN,
    name,
    password
  };
}

export function logOut() {
  return {
    type: types.AUTH_LOGOUT
  };
}
