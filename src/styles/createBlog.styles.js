import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    padding: "30px 0",
    "& .MuiInputBase-root": {
      width: "316px !important",
    },
    "& textarea": {
      width: "300px !important",
    },
  },
  formBox: {
    padding: "20px 5px",
  },
}));
