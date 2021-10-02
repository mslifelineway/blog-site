import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    border: `1px solid ${theme.palette.primary.darkBorder}`,
    padding: "4px 20px",
    borderRadius: "3px",
    fontFamily: theme.typography.poppins,
    letterSpacing: "0.05em",
    fontSize: "14px",
    width: "260px",
    outline: "none",
  },
  error: {
    color: theme.palette.error.main,
    position: "absolute",
    top: "42px",
    right: 0,
    margin: "0 auto",
    padding: 0,
    fontSize: "10px",
    left: 0,
    width: "100%",
    whiteSpace: "nowrap",
  },

  textarea: {
    border: `1px solid ${theme.palette.primary.darkBorder}`,
    padding: "10px",
    borderRadius: "3px",
    fontFamily: theme.typography.poppins,
    letterSpacing: "0.05em",
    fontSize: "14px",
    width: "240px",
    outline: "none",
  },
  error1: {
    color: theme.palette.error.main,
    position: "absolute",
    right: 0,
    margin: "0 auto",
    padding: 0,
    fontSize: "10px",
    left: 0,
    width: "100%",
    whiteSpace: "nowrap",
  },
}));
