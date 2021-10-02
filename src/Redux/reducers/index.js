import { combineReducers } from "redux";
import authReducer from "./authReducer";
import blogReducer from "./blogReducer";
import userReducers from "./userReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  blogReducer: blogReducer,
  userReducer: userReducers,
});

export default rootReducer;
