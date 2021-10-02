import {
  Box,
  Grid,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import useStyles from "../styles/blogs.styles";
import { Layout } from "../components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { SnackbarContext } from "../context/SnackbarContext";
import { messages, pagePaths, roles, severities } from "../utils/constants";
import { changeUserStatus, getUsers } from "../Redux/actions/userActions";
import { useHistory } from "react-router";

const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setSnackbarOptions } = useContext(SnackbarContext);
  const userReducer = useSelector((state) => state.userReducer);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role !== roles.admin) {
    history.push({ pathname: pagePaths.blogs, message: messages.forbidden });
  }
  useEffect(() => {
    dispatch(getUsers())
      .then(() => {})
      .catch((e) => {
        const { response } = e;
        if (response) {
          const { message } = response.data.error;
          setSnackbarOptions((old) => ({ ...old, message, open: true }));
          return;
        }
      });
  }, []);

  useEffect(() => {
    const { loading, error, message } = userReducer;
    if (userReducer.message && !loading) {
      setSnackbarOptions((old) => ({
        ...old,
        message,
        open: true,
        severity: error ? severities.error : severities.success,
      }));
    }
  }, [userReducer]);

  const handleChange = (e, userId) => {
    const { checked } = e.target;
    dispatch(changeUserStatus(userId, !checked))
      .then(() => {})
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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userReducer.users.length > 0 ? (
              userReducer.users.map((user, i) => (
                <TableRow key={user._id}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {moment(user.create_at).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={!user.is_active}
                      onChange={(e) => handleChange(e, user._id)}
                      name={user.is_active ? "Block" : "Un Block"}
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={6}>
                  <Typography variant="h6" align="center">
                    No users found!
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
              Users
            </Typography>
            {renderTable()}
          </Grid>
        </Grid>
      </Layout>
    </Box>
  );
};

export default Users;
