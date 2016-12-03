import { routerReducer } from 'react-router-redux'
import * as types from "./actionTypes"

const reducers = {
  auth(state = {isAuthenticated: null}, action) {
    switch (action.type) {
      case types.AUTH_LOGIN: {
        return Object.assign(
          state,
          {isAuthenticated: true}
        )
      } break;

      case types.AUTH_LOGOUT: {
        return Object.assign(
          state,
          {isAuthenticated: false}
       )
      } break;

      default: return state;
    }
  },

  routing: routerReducer
};

export default reducers;
