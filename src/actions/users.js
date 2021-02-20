const axios = require('axios');

export const REGISTER_NEW_USER = 'REGISTER_NEW_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

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