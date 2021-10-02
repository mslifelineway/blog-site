import HttpCalls from "../utils/serviceCaller";

export const registerUser = async (payload, cookies) => {
  let { call } = HttpCalls;
  let headers = await headersData();
  return call("POST", "/user/register", headers, payload);
};

export const loginUser = async (payload, cookies) => {
  let { call } = HttpCalls;
  let headers = await headersData();
  return call("POST", "/user/login", headers, payload);
};

const headersData = async (cookies) => {
  let token;
  if (cookies && cookies.length !== "undefined") {
    token = cookies[0] ? cookies[0].token : "";
  }
  return {
    headers: {
      "Content-Type": "application/json",
      token: token ? token : "",
    },
  };
};
