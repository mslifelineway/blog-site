import axios from "../Axios/axios";
import { userActionTypes } from "./actionTypes";

export const getUsers = () => {
  return async (dispatch) => {
    dispatch({
      type: userActionTypes.GET_USERS_REQUEST,
    });
    const res = await axios.get("/user/allusers");
    if (res && res.status === 200) {
      const { result } = res.data;
      dispatch({
        type: userActionTypes.GET_USERS_SUCCESS,
        payload: {
          users: result,
        },
      });
    } else {
      const { message } = res.data;
      dispatch({
        type: userActionTypes.GET_USERS_FAILURE,
        payload: {
          message: message,
        },
      });
    }
  };
};

export const changeUserStatus = (id, status) => {
  return async (dispatch) => {
    dispatch({
      type: userActionTypes.CHANGE_USER_STATUS_REQUEST,
    });

    const res = await axios.patch(`/user/changeStatus/${id}`, {
      status: status,
    });
    if (res && res.status === 200) {
      const { result, message } = res.data;
      dispatch({
        type: userActionTypes.CHANGE_USER_STATUS_SUCCESS,
        payload: {
          user: result,
          message,
        },
      });
    } else {
      const { error, message } = res.data;
      dispatch({
        type: userActionTypes.CHANGE_USER_STATUS_FAILURE,
        payload: {
          error: error,
          message: message,
        },
      });
    }
  };
};

export const registerUser = (user, resetForm) => {
  return async (dispatch) => {
    dispatch({
      type: userActionTypes.REGISTER_REQUEST,
    });

    try {
      const res = await axios.post("/user/register", user);
      if (res.status === 201) {
        resetForm();
        const { message, result } = res.data;
        dispatch({
          type: userActionTypes.REGISTER_SUCCESS,
          payload: {
            message,
            user: result,
          },
        });
      }
    } catch (e) {
      const { response } = e;
      if (response) {
        const { message } = response.data.error;
        dispatch({
          type: userActionTypes.REGISTER_FAILURE,
          payload: {
            message: message,
          },
        });
      }
    }
  };
};
