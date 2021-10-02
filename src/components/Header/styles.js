import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    height: "64px",
  },
  left: { flexGrow: 1 },
  title: {
    textDecoration: "none",
    color: "white",
    padding: "5px 10px",
    "&:hover": {
      color: "#f0f0f0",
    },
  },
  link: {
    fontWeight: "400",
    "&:hover": {
      background: "#3526dd",
      color: "#f0f0f0",
    },
  },
  activeLink: {
    fontWeight: "400",
    color: "#22ffeb",
    "&:hover": {
      background: "#3526dd",
      color: "#22ffeb",
    },
  },
}));
