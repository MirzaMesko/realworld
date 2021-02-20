const axios = require('axios');

export const REGISTER_NEW_USER = 'REGISTER_NEW_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

export function registrationSuccess(token, user) {
    return {
      type: REGISTER_NEW_USER,
      token,
      user,
    };
  }

  export function loginSuccess(token, user) {
    return {
      type: LOGIN_SUCCESS,
      token,
      user,
    };
  }

  export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('user');
    return {
      type: LOG_OUT,
    };
  }
  
  export function checkAuthTimeout(expirationTime) {
    return (dispatch) => {
      setTimeout(() => {
        dispatch(logout());
      }, expirationTime * 1000);
    };
  }
  
  export function authCheckState() {
    return (dispatch) => {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch(logout());
      } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate >= new Date()) {
          const user = localStorage.getItem('user');
          dispatch(loginSuccess(token, user));
          dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        } else {
          dispatch(logout());
        }
      }
    };
  }

  export function registerUser(user) {
    return (dispatch) =>
      axios
        .post('https://conduit.productionready.io/api/users', { user })
        .then((response) => {
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          localStorage.setItem('token', response.data.user.token);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('user', response.data.user.username);
          dispatch(registrationSuccess(response.data.user.token, response.data.user));
        })
        .catch((error) => {
          console.log(error.errors);
        });
  }

  export function login(user) {
    return (dispatch) =>
      axios
        .post('https://conduit.productionready.io/api/users/login', { user })
        .then((response) => {
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          localStorage.setItem('token', response.data.user.token);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('user', response.data.user.username);
          dispatch(loginSuccess(response.data.user.token, response.data.user));
        })
        .catch((error) => {
          console.log(error.errors);
        });
  }