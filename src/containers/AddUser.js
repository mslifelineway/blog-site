import { Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { Layout, UserForm } from "../components";
import useStyles from "../styles/login.styles";
import { messages, pagePaths, roles } from "../utils/constants";

const AddUser = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role !== roles.admin) {
    history.push({ pathname: pagePaths.blogs, message: messages.forbidden });
  }
  return (
    <Box className={classes.root}>
      <Layout>
        <UserForm register />
      </Layout>
    </Box>
  );
};

export default AddUser;
