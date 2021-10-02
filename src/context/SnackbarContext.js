import React, { createContext } from "react";
import { CustomSnackbar } from "../components";
import { severities } from "../utils/constants";

const SnackbarContext = createContext();

const SnackbarContextProvider = ({ children }) => {
  const [snackbarOptions, setSnackbarOptions] = React.useState({
    open: false,
    severity: severities.error,
    message: "",
  });
  const handleOpen = () => {
    setSnackbarOptions((old) => ({ ...old, open: true }));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOptions((old) => ({
      ...old,
      open: false,
    }));
  };
  return (
    <SnackbarContext.Provider
      value={{
        setSnackbarOptions,
        snackbarOptions,
        handleOpen,
        handleClose,
      }}
    >
      <CustomSnackbar
        snackbarOptions={snackbarOptions}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      {children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarContextProvider };
