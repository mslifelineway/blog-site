import { authActionTypes } from "../actions/actionTypes";

const initialState = {
  token: null,
  user: {},
  error: null,
  message: null,
  loading: false,
  authenticate: false,
  authenticating: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        loading: true,
      };
      break;
    case authActionTypes.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        loading: false,
      };
      break;

    case authActionTypes.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authActionTypes.LOGOUT_SUCCESS:
      state = {
        ...initialState,
      };
      break;
    case authActionTypes.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        message: action.payload.message,
      };
      break;

    default:
      break;
  }

  return state;
};
export default authReducer;
