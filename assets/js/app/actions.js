import * as types from "./actionTypes"
import io from "./io"
import { push } from 'react-router-redux'
import Cookie from "js-cookie"

export function logIn(email, password) {
  return function(dispatch) {
    dispatch(logInStart());
    return new Promise(function (resolve, reject) {
      io.socket.post('/login', { email: email, password: password }, function (resData, jwRes) {
        console.log(resData);
        try {
          if (!resData.message) {
            Cookie.set("token", resData.token, {expires: resData.expires});
            Cookie.set("user", resData.user, {expires: resData.expires});
            dispatch(logInSuccess(resData.token, resData.user));
            resolve(dispatch(push("/")));
          } else {
            resolve(dispatch(logInError(resData.message)));
          }
        } catch (error) {
          reject(dispatch(logInError(error)));
        }
      });
    });
  }
}

export function signUp(email, password) {
  return function(dispatch) {
    dispatch(signUpStart());
    return new Promise(function (resolve, reject) {
      io.socket.post('/signup', { email: email, password: password }, function (resData, jwRes) {
        console.log(resData);
        try {
          if (!resData.message) {
            Cookie.set("token", resData.token, {expires: resData.expires});
            Cookie.set("user", resData.user, {expires: resData.expires});
            dispatch(signUpSuccess(resData.token, resData.user));
            resolve(dispatch(push("/")));
          } else {
            resolve(dispatch(signUpError(resData.message)));
          }
        } catch (error) {
          reject(dispatch(signUpError(error)));
        }
      });
    });
  }
}

export function logInStart() {
  return {
    type: types.AUTH_LOGIN_START
  };
}

export function logInSuccess(token, user) {
  return {
    type: types.AUTH_LOGIN_COMPLETE,
    token,
    user
  };
}

export function logInError(error) {
  return {
    type: types.AUTH_LOGIN_FAILED,
    error
  };
}

export function signUpStart() {
  return {
    type: types.AUTH_SIGNUP_START
  };
}

export function signUpSuccess(token, user) {
  return {
    type: types.AUTH_SIGNUP_COMPLETE,
    token,
    user
  };
}

export function signUpError(error) {
  return {
    type: types.AUTH_SIGNUP_FAILED,
    error
  };
}

export function logOut() {
  return function (dispatch) {
    Cookie.remove("token");
    Cookie.remove("user");
    return dispatch(logOutFinish());
  }
}

export function logOutFinish() {
  return {
    type: types.AUTH_LOGOUT
  };
}
