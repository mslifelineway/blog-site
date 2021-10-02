import { createTheme } from "@material-ui/core";
const theme = createTheme({
  palette: {
    primary: {
      main: "#281AC8",
      border: "#F0F0F0",
      darkBorder: "#b8b8b8",
      color: "#1E0338",
    },
    secondary: {
      main: "#FD749B",
    },
    error: {
      main: "#F85D5D",
      light: "#f85d5dc4",
    },
    success: {
      main: "#1CD1A1",
      light: "#3fbe63",
    },
    text: {
      primary: "#858585",
      color: "#494949",
    },
    gradient: {
      right: `linear-gradient(to right, rgba(253, 116, 155, .8), rgba(40, 26, 200, .7))`,
      bottom: `linear-gradient(to bottom, rgba(253, 116, 155, .8), rgba(40, 26, 200, .7))`,
      left: `linear-gradient(to left, rgba(253, 116, 155, .8), rgba(40, 26, 200, .7))`,
      top: `linear-gradient(to top, rgba(253, 116, 155, .8), rgba(40, 26, 200, .7))`,
    },
  },
  typography: {
    fontFamily: "Poppins Medium",
    body1: {
      fontFamily: "Poppins",
    },
    poppins: "'Poppins', sans-serif",
    poppinsBold: "'Poppins Bold', sans-serif",
    poppinsExtraBold: "'Poppins Extra Bold', sans-serif",
    poppinsLight: "'Poppins Light', sans-serif",
    poppinsMedium: "'Poppins Medium', sans-serif",
    poppinsRegular: "'Poppins Regular', sans-serif",
    poppinsSemiBold: "'Poppins Semi-Bold', sans-serif",
  },
  action: {
    hover: {
      whiteFilter: `brightness(0) invert(1)`,
    },
  },
});

export default theme;
