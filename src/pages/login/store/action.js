import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "./actionTypes";
  
  import AuthService from "../../../services/auth.service";
  import {userData} from '../../../@fake-db/auth';

import { SET_MESSAGE } from "../../../actions/types";
  
  export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const login = (username, password) => (dispatch) => {
  
    const data = userData.find(
      (user) => user.username === username && user.password === password
    );
    
    if (data) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
  
      dispatch({
        type: SET_MESSAGE,
        payload: "Please Provide currect Info!",
      });
    }
  };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };
  