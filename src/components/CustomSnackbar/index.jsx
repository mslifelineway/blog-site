import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { severities } from "../../utils/constants";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackbar = ({ snackbarOptions, handleClose }) => {
  const {
    open = false,
    severity = severities.warning,
    message = "",
  } = snackbarOptions || {};
  return (
    message !== "" && (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Note archived"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    )
  );
};

export default CustomSnackbar;
