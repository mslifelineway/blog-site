import { messages } from "../../utils/constants";
import { blogActionTypes } from "../actions/actionTypes";

const initialState = {
  blogs: [],
  approvedBlogs: [],
  disApprovedBlogs: [],
  error: null,
  message: null,
  loading: false,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case blogActionTypes.GET_ALL_BLOGS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case blogActionTypes.GET_ALL_BLOGS_SUCCESS:
      const { blogs = [] } = action.payload;
      const { approvedBlogs, disApprovedBlogs } = filterBlogs(blogs);
      state = {
        ...state,
        loading: false,
        blogs: blogs,
        approvedBlogs,
        disApprovedBlogs,
      };
      break;

    case blogActionTypes.GET_ALL_BLOGS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
        message: action.payload.message,
      };
      break;
    case blogActionTypes.ADD_BLOG_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case blogActionTypes.ADD_BLOG_SUCCESS:
      state = {
        ...state,
        blogs: action.payload.blog
          ? [...state.blogs, action.payload.blog]
          : [...state.blogs],
        error: action.payload.error,
        message: action.payload.message,
        loading: false,
      };
      break;
    case blogActionTypes.ADD_BLOG_FAILURE:
      state = {
        loading: false,
        error: null,
        message: null,
      };
      break;
    case blogActionTypes.APPROVE_BLOG_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case blogActionTypes.APPROVE_BLOG_SUCCESS:
      const { blog } = action.payload;
      const filtered = [...state.blogs].filter((b) => {
        if (b._id == blog._id) {
          b.hasApproved = true;
        }
        return b;
      });
      const disApprovedFilter = [...state.disApprovedBlogs].filter(
        (b) => b._id != blog._id
      );
      state = {
        ...state,
        blogs: filtered,
        approvedBlogs: [...state.approvedBlogs, blog],
        disApprovedBlogs: disApprovedFilter,
        error: action.payload.error,
        message: action.payload.message,
        loading: false,
      };
      break;
    case blogActionTypes.APPROVE_BLOG_FAILURE:
      state = {
        ...state,
        loading: false,
        error: null,
        message: null,
      };
      break;
    case blogActionTypes.DELETE_BLOG_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case blogActionTypes.DELETE_BLOG_SUCCESS:
      const { id } = action.payload;
      const newBlogs = [...state.blogs].filter((b) => b._id != id);
      const { approvedBlogs: approvedData, disApprovedBlogs: disApprovedData } =
        filterBlogs(newBlogs);
      state = {
        ...state,
        blogs: newBlogs,
        approvedBlogs: approvedData,
        disApprovedBlogs: disApprovedData,
        message: messages.blogDeleted,
        loading: false,
      };
      break;
    case blogActionTypes.APPROVE_BLOG_FAILURE:
      state = {
        ...state,
        loading: false,
        error: null,
        message: null,
      };
      break;
    default:
      break;
  }

  return state;
};

const filterBlogs = (blogs) => {
  const approvedBlogs = [];
  const disApprovedBlogs = [];
  blogs.forEach((blog) => {
    if (blog.hasApproved) {
      approvedBlogs.push(blog);
    } else {
      disApprovedBlogs.push(blog);
    }
  });
  return { approvedBlogs, disApprovedBlogs };
};

export default blogReducer;
