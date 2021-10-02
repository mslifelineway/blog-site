import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { pagePaths, roles } from "../../utils/constants";
import { useHistory, useLocation } from "react-router";

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");
  const location = useLocation();
  const pathname = location.pathname;

  const logoutUser = () => {
    localStorage.clear();
    history.push(pagePaths.login);
  };

  const getClassName = (path) => {
    return pathname === path ? classes.activeLink : classes.link;
  };
  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <div className={classes.left}>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to={pagePaths.root}
          >
            Blog Site
          </Typography>
        </div>
        <Button
          color="inherit"
          component={Link}
          to={pagePaths.blogs}
          className={getClassName(pagePaths.blogs)}
        >
          Blogs
        </Button>
        {user.role === roles.admin && (
          <React.Fragment>
            <Button
              color="inherit"
              component={Link}
              to={pagePaths.disApprovedBlogs}
              className={getClassName(pagePaths.disApprovedBlogs)}
            >
              Dis-approved Blogs
            </Button>
            <Button
              color="inherit"
              component={Link}
              to={pagePaths.addUser}
              className={getClassName(pagePaths.addUser)}
            >
              Add User
            </Button>
            <Button
              color="inherit"
              component={Link}
              to={pagePaths.users}
              className={getClassName(pagePaths.users)}
            >
              Users
            </Button>
          </React.Fragment>
        )}
        {user.role === roles.contentWriter && (
          <Button
            color="inherit"
            component={Link}
            to={pagePaths.createBlog}
            className={getClassName(pagePaths.createBlog)}
          >
            Create a blog
          </Button>
        )}

        {token ? (
          <Button color="secondary" onClick={logoutUser}>
            Logout
          </Button>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to={pagePaths.login}
            className={getClassName(pagePaths.login)}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
