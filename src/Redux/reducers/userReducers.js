import { userActionTypes } from "../actions/actionTypes";

const initialState = {
  users: [],
  message: null,
  loading: false,
  error: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.GET_USERS_REQUEST:
      state = {
        ...state,
        loading: true,
        message: "Fetching users",
      };
      break;
    case userActionTypes.GET_USERS_SUCCESS:
      const { users = [], message } = action.payload;
      state = {
        ...state,
        users,
        loading: false,
        message,
      };
      break;
    case userActionTypes.GET_USERS_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userActionTypes.CHANGE_USER_STATUS_REQUEST:
      state = {
        ...state,
        loading: true,
        message: "User status changing...",
      };
      break;
    case userActionTypes.CHANGE_USER_STATUS_SUCCESS:
      const { user, message: _msg } = action.payload;
      const newUsers = [...state.users].filter((u) => {
        if (u._id == user._id) {
          u.is_active = !user.is_active;
        }
        return u;
      });
      state = {
        ...state,
        users: newUsers || [],
        loading: false,
        message: _msg,
      };
      break;
    case userActionTypes.CHANGE_USER_STATUS_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userActionTypes.REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
        message: "Please wait, while creating your account...",
      };
      break;
    case userActionTypes.REGISTER_SUCCESS:
      const { user: _user, message: regMessage } = action.payload;

      state = {
        ...state,
        users: [...state.users].push(_user),
        loading: false,
        message: regMessage,
        error: false,
      };
      break;
    case userActionTypes.REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message,
      };
      break;

    default:
      break;
  }

  return state;
};
export default userReducer;
