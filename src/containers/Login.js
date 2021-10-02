import { Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { Layout, UserForm } from "../components";
import useStyles from "../styles/login.styles";
import { pagePaths } from "../utils/constants";

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");
  if (token) {
    history.push({ pathname: pagePaths.blogs });
  }

  return (
    <Box className={classes.root}>
      <Layout>
        <UserForm />
      </Layout>
    </Box>
  );
};

export default Login;
