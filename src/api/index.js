import axios from 'axios';
import {API_BASE_URL} from '../config/api';
import store from '../redux/store';
import ACTION_TYPES from '../constants/actions';

axios.defaults.baseURL = API_BASE_URL;

export class ApiHeaders {
  get defaultHeaders() {
    return {};
  }
  get authenticationHeaders() {
    var accessToken = store.getState().authReducer.accessToken;
    const headers = {...this.defaultHeaders};
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return headers;
  }
}

class Api extends ApiHeaders {
  static async get(path, params = {}, headers = {}) {
    return await axios.get(path, {params, headers}).catch(error => {
      const hasAuthorization = Object.keys(headers).includes('Authorization');
      if (
        hasAuthorization &&
        error &&
        error.response &&
        error.response.status &&
        error.response.status === 401
      ) {
        store.dispatch({type: ACTION_TYPES.AUTH.LOGOUT});
      } else {
        throw error;
      }
    });
  }

  static async post(path, data = {}, headers = {}) {
    return await axios.post(path, data, {headers}).catch(error => {
      const hasAuthorization = Object.keys(headers).includes('Authorization');
      if (
        hasAuthorization &&
        error &&
        error.response &&
        error.response.status &&
        error.response.status === 401
      ) {
        store.dispatch({type: ACTION_TYPES.AUTH.LOGOUT});
      } else {
        throw error;
      }
    });
  }

  static async put(path, data = {}, headers = {}) {
    return await axios.put(path, data, {headers}).catch(error => {
      const hasAuthorization = Object.keys(headers).includes('Authorization');
      if (
        hasAuthorization &&
        error &&
        error.response &&
        error.response.status &&
        error.response.status === 401
      ) {
        store.dispatch({type: ACTION_TYPES.AUTH.LOGOUT});
      } else {
        throw error;
      }
    });
  }

  static async patch(path, data = {}, headers = {}) {
    return await axios.patch(path, data, {headers}).catch(error => {
      const hasAuthorization = Object.keys(headers).includes('Authorization');
      if (
        hasAuthorization &&
        error &&
        error.response &&
        error.response.status &&
        error.response.status === 401
      ) {
        store.dispatch({type: ACTION_TYPES.AUTH.LOGOUT});
      } else {
        throw error;
      }
    });
  }

  static async delete(path, params = {}, headers = {}) {
    return await axios.delete(path, {params, headers}).catch(error => {
      const hasAuthorization = Object.keys(headers).includes('Authorization');
      if (
        hasAuthorization &&
        error &&
        error.response &&
        error.response.status &&
        error.response.status === 401
      ) {
        store.dispatch({type: ACTION_TYPES.AUTH.LOGOUT});
      } else {
        throw error;
      }
    });
  }
}

export default Api;
