import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import useStyles from "../styles/blogs.styles";
import { Layout } from "../components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { approveBlog, deleteBlog } from "../Redux/actions/blogActions.";
import { SnackbarContext } from "../context/SnackbarContext";
import {
  actions,
  messages,
  pagePaths,
  roles,
  severities,
} from "../utils/constants";
import { useHistory } from "react-router";

const DisApprovedBlogs = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setSnackbarOptions } = useContext(SnackbarContext);
  const blogReducer = useSelector((state) => state.blogReducer);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role !== roles.admin) {
    history.push({ pathname: pagePaths.blogs, message: messages.forbidden });
  }

  const doAction = (blogId, action) => {
    dispatch(
      action === actions.DELETE ? deleteBlog(blogId) : approveBlog(blogId)
    )
      .then(() => {
        setSnackbarOptions((old) => ({
          ...old,
          message:
            action === actions.DELETE ? "Blog Deleted!" : "Blog approved!",
          open: true,
          severity: severities.success,
        }));
      })
      .catch((e) => {
        const { response } = e;
        if (response) {
          const { message } = response.data.error;
          setSnackbarOptions((old) => ({ ...old, message, open: true }));
          return;
        }
      });
  };

  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="center">Content</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogReducer.disApprovedBlogs.length > 0 ? (
              blogReducer.disApprovedBlogs.map((blog, i) => (
                <TableRow key={blog._id}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.content}</TableCell>
                  <TableCell>{blog.user.name}</TableCell>
                  <TableCell>
                    {moment(blog.create_at).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <div className={classes.actions}>
                      <Button
                        color="primary"
                        onClick={() => doAction(blog._id, actions.APPROVE)}
                        size="small"
                      >
                        Approve
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => doAction(blog._id, actions.DELETE)}
                        size="small"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={6}>
                  <Typography variant="h6" align="center">
                    No pending blogs found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  return (
    <Box className={classes.root}>
      <Layout>
        <Grid
          container
          direction="row"
          justifyContent="center"
          className={classes.root}
        >
          <Grid item lg={10} md={10} sm={12} xs={12}>
            <Typography variant="h5" align="center" className={classes.heading}>
              Disapproved Blogs
            </Typography>
            {renderTable()}
          </Grid>
        </Grid>
      </Layout>
    </Box>
  );
};

export default DisApprovedBlogs;
