import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  GET_SYSTEM_USERS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    systemUsers: [],
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Get System Users
  const getSystemUsers = async () => {
    try {
      //todo: get users host from config
      const res = await axios.get("http://localhost:8081/api/users");

      const usernames = res.data.map((user) => {
        return user.id;
      });

      dispatch({
        type: GET_SYSTEM_USERS,
        payload: usernames,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      //todo: get auth host from config
      const res = await axios.get("http://localhost:8081/api/auth/decrypt");

      const user = res.data;

      if (
        user &&
        user.groups &&
        user.groups.length > 0 &&
        user.groups.includes("admin")
      ) {
        user.role = "admin";
        getSystemUsers();
      } else {
        user.role = "user";
      }

      dispatch({
        type: USER_LOADED,
        payload: user,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //todo: get clientId and secret from config
    const credentials = {
      clientId: "client-id",
      clientSecret: "secret",
      username: formData.username,
      password: formData.password,
    };

    try {
      //todo: get auth host from config
      const res = await axios.post(
        "http://localhost:8081/api/auth/login",
        credentials,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        systemUsers: state.systemUsers,
        loadUser,
        login,
        logout,
        clearErrors,
        getSystemUsers,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
