export const baseUrl =
  window.location.hostname === "localhost"
    ? `http://localhost:5000`
    : "https://blog-today.herokuapp.com";
export const api = `${baseUrl}/api`;
