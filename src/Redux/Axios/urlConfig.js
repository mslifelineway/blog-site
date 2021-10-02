export const baseUrl =
  window.location.hostname === "blog-today.herokuapp.com"
    ? "https://blog-today.herokuapp.com"
    : `http://localhost:5000`;
export const api = `${baseUrl}/api`;
