import axios from "../Axios/axios";
import { blogActionTypes } from "./actionTypes";

export const createBlog = (blog) => {
  return async (dispatch) => {
    dispatch({
      type: blogActionTypes.ADD_BLOG_REQUEST,
    });

    const res = await axios.post("/blog/create", blog);
    if (res && res.status === 201) {
      const { result } = res.data;
      dispatch({
        type: blogActionTypes.ADD_BLOG_SUCCESS,
        payload: {
          blog: result,
        },
      });
    } else {
      const { error, message } = res.data;
      dispatch({
        type: blogActionTypes.ADD_BLOG_FAILURE,
        payload: {
          error: error,
          message: message,
        },
      });
    }
  };
};
export const getAllBlogs = () => {
  return async (dispatch) => {
    dispatch({
      type: blogActionTypes.GET_ALL_BLOGS_REQUEST,
    });

    const res = await axios.get("/blog/all");
    if (res && res.status === 200) {
      const { result } = res.data;
      dispatch({
        type: blogActionTypes.GET_ALL_BLOGS_SUCCESS,
        payload: {
          blogs: result,
        },
      });
    } else {
      const { error, message } = res.data;
      dispatch({
        type: blogActionTypes.GET_ALL_BLOGS_FAILURE,
        payload: {
          error: error,
          message: message,
        },
      });
    }
  };
};
export const approveBlog = (id) => {
  return async (dispatch) => {
    dispatch({
      type: blogActionTypes.APPROVE_BLOG_REQUEST,
    });

    const res = await axios.patch(`/blog/approve/${id}`);
    if (res && res.status === 200) {
      const { result } = res.data;
      dispatch({
        type: blogActionTypes.APPROVE_BLOG_SUCCESS,
        payload: {
          blog: result,
        },
      });
    } else {
      const { error, message } = res.data;
      dispatch({
        type: blogActionTypes.APPROVE_BLOG_FAILURE,
        payload: {
          error: error,
          message: message,
        },
      });
    }
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    dispatch({
      type: blogActionTypes.DELETE_BLOG_REQUEST,
    });

    const res = await axios.delete(`/blog/delete/${id}`);
    if (res && res.status === 204) {
      dispatch({
        type: blogActionTypes.DELETE_BLOG_SUCCESS,
        payload: {
          id,
        },
      });
    } else {
      const { error, message } = res.data;
      dispatch({
        type: blogActionTypes.DELETE_BLOG_FAILURE,
        payload: {
          error: error,
          message: message,
        },
      });
    }
  };
};
