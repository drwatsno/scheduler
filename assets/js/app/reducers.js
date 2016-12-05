import { routerReducer } from 'react-router-redux'
import * as types from "./actionTypes"

const reducers = {
  auth(state = {
    isAuthenticated: false,
    token: null,
    authActionPending: false
  }, action) {
    switch (action.type) {

      case types.AUTH_LOGIN_START: {
        return Object.assign(
          state,
          {authActionPending: true}
        )
      } break;

      case types.AUTH_LOGIN_COMPLETE: {
        return Object.assign(
          state,
          {
            authActionPending: false,
            token: action.token,
            isAuthenticated: true
          }
        )
      } break;

      case types.AUTH_LOGIN_FAILED: {
        return Object.assign(
          state,
          {authActionPending: false}
        )
      } break;

      case types.AUTH_LOGOUT: {
        return Object.assign(
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
