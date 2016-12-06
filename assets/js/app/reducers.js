import { routerReducer } from 'react-router-redux'
import * as types from "./actionTypes"
import Cookie from "js-cookie"

const reducers = {
  auth(state = {
    isAuthenticated: !!Cookie.get("token") || false,
    token: Cookie.get("token") || null,
    authActionPending: false,
    authActionError: null,
    user: Cookie.getJSON("user") || null
  }, action) {
    switch (action.type) {

      case types.AUTH_LOGIN_START: {
        return Object.assign(
          {},
          state,
          {authActionPending: true}
        )
      } break;

      case types.AUTH_LOGIN_COMPLETE: {
        return Object.assign(
          {},
          state,
          {
            authActionPending: false,
            token: action.token,
            isAuthenticated: true,
            user: action.user
          }
        )
      } break;

      case types.AUTH_LOGIN_FAILED: {
        return Object.assign(
          {},
          state,
          {
            authActionPending: false,
            authActionError: action.error
          }
        )
      } break;

      case types.AUTH_SIGNUP_START: {
        return Object.assign(
          {},
          state,
          {authActionPending: true}
        )
      } break;

      case types.AUTH_SIGNUP_COMPLETE: {
        return Object.assign(
          {},
          state,
          {
            authActionPending: false,
            token: action.token,
            isAuthenticated: true,
            user: action.user
          }
        )
      } break;

      case types.AUTH_SIGNUP_FAILED: {
        return Object.assign(
          {},
          state,
          {
            authActionPending: false,
            authActionError: action.error
          }
        )
      } break;

      case types.AUTH_LOGOUT: {
        return Object.assign(
          {},
          state,
          {
            authActionPending: false,
            isAuthenticated: false,
            token: null
          }
        )
      } break;

      default: return state;
    }
  },

  routing: routerReducer
};

export default reducers;
