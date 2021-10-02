import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { InputElement } from "../components";
import { createBlog } from "../Redux/actions/blogActions.";
import useStyles from "../styles/createBlog.styles";
import { createBlogValidate } from "../Validations/CreateBlogValidation";
import { useDispatch } from "react-redux";
import { SnackbarContext } from "../context/SnackbarContext";
import { messages, pagePaths, roles, severities } from "../utils/constants";
import { useHistory } from "react-router";
import { Layout } from "../components";

const CreateBlog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { setSnackbarOptions } = useContext(SnackbarContext);
  const [blog, setBlog] = useState({ title: "", content: "" });
  const [errors, setErrors] = useState({ title: "", content: "" });

  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role !== roles.contentWriter) {
    history.push({ pathname: pagePaths.blogs, message: messages.forbidden });
  }

  const clearAllErrors = () => {
    const clearedErrObj = Object.keys(errors).map((e) => (errors[e] = ""));
    setErrors(clearedErrObj);
  };

  const handleInputChange = async (e) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
    try {
      await createBlogValidate.validateAt(name, { [name]: value });
      clearAllErrors();
    } catch (e) {
      const { errors } = e;
      let newError = {};
      errors &&
        errors.forEach((err) => {
          const key = Object.keys(err);
          newError[key[0]] = err[key[0]];
        });
      setErrors({ ...errors, ...newError });
    }
  };
  const create = async (event) => {
    event.preventDefault();
    try {
      await createBlogValidate.validate(blog, {
        abortEarly: false,
      });
      createNewBlog();
    } catch (e) {
      const { errors } = e ? e : {};
      let newError = {};
      errors &&
        errors.forEach((err) => {
          const key = Object.keys(err);
          newError[key[0]] = err[key[0]];
        });
      setErrors({ ...errors, ...newError });
    }
  };

  const createNewBlog = () => {
    dispatch(createBlog(blog))
      .then(() => {
        setSnackbarOptions((old) => ({
          ...old,
          message: "Blog created successfully!",
          open: true,
          severity: severities.success,
        }));
        setTimeout(() => {
          history.push(pagePaths.blogs);
        }, 1000);
      })
      .catch((e) => {
        const { response } = e;
        if (response) {
          let message = response.data.message;
          if (response.data.error && response.data.error.message) {
            message = response.data.error.message;
          }
          setSnackbarOptions((old) => ({ ...old, message, open: true }));
          return;
        }
      });
  };

  return (
    <Layout>
      <Grid
        container
        direction="row"
        justifyContent="center"
        className={classes.root}
      >
        <Grid item lg={5} md={5} sm={8} xs={10}>
          <Card classes={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" align="center">
                Create a blog
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                className={classes.formBox}
              >
                <InputElement
                  name="title"
                  placeholder="title..."
                  value={blog.title}
                  onChange={handleInputChange}
                  error={errors.title}
                />
                <Box height="25px" />
                <InputElement
                  inputType="TextareaAutosize"
                  name="content"
                  placeholder="content..."
                  value={blog.content}
                  onChange={handleInputChange}
                  error={errors.content}
                />
                <Box height="50px" />
                <Button variant="contained" color="primary" onClick={create}>
                  Create
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};
export default CreateBlog;
