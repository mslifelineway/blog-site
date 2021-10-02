import axios from "axios";
import { api } from "./urlConfig";
import store from "../store";
import { authActionTypes } from "../actions/actionTypes";

const token = window.localStorage.getItem("token");

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth && auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosIntance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const response = error.response;
    if (response) {
      const { status } = response;
      if (status === 401) {
        localStorage.clear();
        store.dispatch({
          type: authActionTypes.LOGOUT_SUCCESS,
        });
      }
      return Promise.reject(error);
    }
  }
);
export default axiosIntance;
