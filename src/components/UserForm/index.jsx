import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { InputElement } from "..";
import { useHistory } from "react-router";
import { severities, pagePaths } from "../../utils/constants";
import {
  loginUserSchema,
  newUserSchema,
} from "../../Validations/UserFormValidation";
import useStyles from "./styles";
import { SnackbarContext } from "../../context/SnackbarContext";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/actions/authActions";
import { registerUser } from "../../Redux/actions/userActions";

const UserForm = (props) => {
  const { register } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { setSnackbarOptions } = useContext(SnackbarContext);
  const userReducer = useSelector((state) => state.userReducer);
  const initialData = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = React.useState({ ...initialData });

  const [errors, setErrors] = React.useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });

  const clearAllErrors = () => {
    const clearedErrObj = Object.keys(errors).map((e) => (errors[e] = ""));
    setErrors(clearedErrObj);
  };

  const handleInputChange = async (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
    try {
      await newUserSchema.validateAt(name, { [name]: value });
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

  useEffect(() => {
    const { loading, error, message } = userReducer;
    if (userReducer.message) {
      setSnackbarOptions((old) => ({
        ...old,
        message,
        open: true,
        severity: error && !loading ? severities.error : severities.success,
      }));
    }
  }, [userReducer]);

  const resetForm = () => {
    setFormData({ ...initialData });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await newUserSchema.validate(formData, {
        abortEarly: false,
      });
      dispatch(registerUser(formData, resetForm));
    } catch (e) {
      const { response } = e;
      if (response) {
        const { message } = response.data.error;
        setSnackbarOptions((old) => ({ ...old, message, open: true }));
        return;
      }

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

  const loginUser = () => {
    dispatch(login(formData))
      .then(() => {
        setSnackbarOptions((old) => ({
          ...old,
          message: "Logged in successfully",
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
          const { message } = response.data.error;
          setSnackbarOptions((old) => ({ ...old, message, open: true }));
          return;
        }
      });
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    delete formData.name;
    try {
      await loginUserSchema.validate(formData, {
        abortEarly: false,
      });
      loginUser();
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

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      className={classes.root}
    >
      <Grid item lg={5} md={5} sm={8} xs={10}>
        <Card>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" align="center">
              {register ? "Register an account!" : "Login"}
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              className={classes.formBox}
            >
              {register && (
                <InputElement
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.nameError}
                />
              )}
              <Box height="25px" />
              <InputElement
                name="email"
                placeholder="Enter email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.emailError}
              />
              <Box height="25px" />
              <InputElement
                name="password"
                placeholder="Enter password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.passwordError}
              />
              <Box height="50px" />
              <Button
                variant="contained"
                color="primary"
                onClick={register ? handleRegister : handleLogin}
              >
                {register ? "Register" : "Login"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default UserForm;
