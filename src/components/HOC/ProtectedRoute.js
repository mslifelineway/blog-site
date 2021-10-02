import React from "react";
import { pagePaths } from "../../utils/constants";

const { Route, Redirect } = require("react-router-dom");

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("token");
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={pagePaths.login} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
