import * as types from "./actionTypes";

export function logIn(email, password) {
  return function(dispatch) {
    dispatch(logInStart());
      return fetch('/login', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
      })
      .then(response => {
        try {
          dispatch(logInSuccess(response.token));
        } catch (e) {
          dispatch(logInError());
        }
      })
      .catch(error => {
        dispatch(logInError(error));
      })
  }
}

export function logInStart() {
  return {
    type: types.AUTH_LOGIN_START
  };
}

export function logInSuccess(token) {
  return {
    type: types.AUTH_LOGIN_START,
    token
  };
}

export function logInError(error) {
  return {
    type: types.AUTH_LOGIN_FAILED,
    error
  };
}

export function logOut() {
  return {
    type: types.AUTH_LOGOUT
  };
}
