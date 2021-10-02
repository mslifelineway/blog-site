import axios from "../Axios/axios";
import { authActionTypes } from "./actionTypes";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authActionTypes.LOGIN_REQUEST,
    });

    const res = await axios.post("/user/login", user);
    if (res && res.status === 200) {
      const { token, result } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(result));
      dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
        payload: {
          token,
          user: result,
        },
      });
    } else {
      const { error, message } = res.data;
      if (res.status === 400) {
        dispatch({
          type: authActionTypes.LOGIN_FAILURE,
          payload: {
            error: error,
            message: message,
          },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authActionTypes.LOGIN_FAILURE,
        payload: {
          error: "Failed to login.",
          message: "Failed to login.",
        },
      });
    }
  };
};
