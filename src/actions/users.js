import { getArticles } from './articles';

const axios = require('axios');

export const REGISTER_NEW_USER = 'REGISTER_NEW_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';

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

  export function getProfileSuccess(profile) {
    return {
      type: GET_PROFILE_SUCCESS,
      profile
    }
  }

  export function getCurrentUserSuccess(user) {
    return {
      type: GET_CURRENT_USER_SUCCESS,
      user
    }
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
          return response
        })
        .catch((error) => {
          return error.response.data.errors
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
          dispatch(loginSuccess(response.data.user.token, response.data.user.username));
          return response
        })
        .catch((error) => {
          return error.response.data.errors
        });
  }

  export function followUser(token, username) {
    const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    const url = 'https://conduit.productionready.io/api/profiles/' + username + '/follow';
    return (dispatch) => {
      axios
      .post(url, {}, {headers})
      .then((response) => {
        dispatch(getProfileSuccess(response.data.profile))
      })
      .catch((error) => {
        console.log(error.errors);
      });
    }
  }

  export function unfollowUser(token, username) {
    const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    const url = 'https://conduit.productionready.io/api/profiles/' + username + '/follow';
    return (dispatch) => {
      axios
      .delete(url, {headers}, {params: {} })
      .then((response) => {
        dispatch(getProfileSuccess(response.data.profile))
      })
      .catch((error) => {
        console.log(error.errors);
      });
    }
  }

  export function editUser(token, email, username, password, image, bio) {
    const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    const user = { email, username, password, image, bio }
    return (dispatch) => { 
      axios
      .put('https://conduit.productionready.io/api/user', {user}, {headers})
      .then((response) => {
        dispatch(getCurrentUserSuccess(response.data.user))
        dispatch(getArticles(response.data.user.username))
        dispatch(getProfile(response.data.user.username));
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  export function getProfile(username) {
    getProfileSuccess([]);
    const url = 'https://conduit.productionready.io/api/profiles/' + username;
    return (dispatch) => {
      axios
      .get(url)
      .then((response) => {
        dispatch(getProfileSuccess(response.data.profile)) 
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  export function getCurrentUser(token) {
    const url = 'https://conduit.productionready.io/api/user';
    const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    return (dispatch) => {
      axios
      .get(url, {headers})
      .then((response) => {
        dispatch(getCurrentUserSuccess(response.data.user)) 
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    }
  }

