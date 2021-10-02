import { Box } from "@material-ui/core";
import React from "react";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Box height="64px" />
      {children}
    </React.Fragment>
  );
};

export default Layout;
