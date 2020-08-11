import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  GET_SYSTEM_USERS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.accessToken);
      return {
        ...state,
        token: action.payload.accessToken,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
        systemUsers: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case GET_SYSTEM_USERS:
      return {
        ...state,
        systemUsers: action.payload,
      };
    default:
      return state;
  }
};
