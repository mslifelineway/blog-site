import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  heading: {
    margin: "40px 0 20px 0",
  },
  title: {
    fontSize: 16,
  },
  content: {
    marginTop: 5,
    fontWeight: 400,
    fontSize: 14,
  },
  details: {
    marginTop: 20,
    fontWeight: 500,
    fontSize: 12,
  },
  card: {
    marginBottom: "10px",
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
}));
