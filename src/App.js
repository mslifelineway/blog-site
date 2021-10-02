import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { pagePaths } from "./utils/constants";
import {
  Login,
  AddUser,
  Dashboard,
  Page404,
  Blogs,
  CreateBlog,
  DisApprovedBlogs,
  Users,
} from "./containers";
import { SnackbarContextProvider } from "./context/SnackbarContext";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./Redux/actions/authActions";
import { getAllBlogs } from "./Redux/actions/blogActions.";
import ProtectedRoute from "./components/HOC/ProtectedRoute";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    // else {
    dispatch(getAllBlogs());
    // }
  }, []);

  return (
    <SnackbarContextProvider>
      <Router>
        <Switch>
          <Redirect exact path={pagePaths.root} to={pagePaths.blogs} />
          <Route path={pagePaths.login} component={Login} />
          <ProtectedRoute path={pagePaths.addUser} component={AddUser} />
          <Route path={pagePaths.blogs} component={Blogs} />
          <ProtectedRoute
            path={pagePaths.disApprovedBlogs}
            component={DisApprovedBlogs}
          />
          <ProtectedRoute path={pagePaths.createBlog} component={CreateBlog} />
          <ProtectedRoute path={pagePaths.users} component={Users} />
          <Route path={pagePaths.all} component={Page404} />
        </Switch>
      </Router>
    </SnackbarContextProvider>
  );
}

export default App;
