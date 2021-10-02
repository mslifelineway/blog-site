import http from "axios";
import { API } from "../utils/constants";
const _get = (url, headers) => {
  return new Promise((resolve, reject) => {
    http
      .get(url)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

const _post = (url, headers, data) => {
  return new Promise((resolve, reject) => {
    http
      .post(url, data, headers)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

const _delete = (url, headers, data) => {
  return new Promise((resolve, reject) => {
    http
      .delete(url, data, headers)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

const _put = (url, headers, data) => {
  return new Promise((resolve, reject) => {
    http
      .put(url, data, headers)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
const _patch = (url, headers, data) => {
  return new Promise((resolve, reject) => {
    http
      .patch(url, data, headers)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
const _do_call = (type, url, headers = {}, data = {}, isustomURI = false) => {
  if (!isustomURI) url = `${API + url}`;
  let res;
  switch (type) {
    case "POST":
      res = _post(url, headers, data);
      break;
    case "GET":
      res = _get(url, headers, data);
      break;
    case "PUT":
      res = _put(url, headers, data);
      break;
    case "DELETE":
      res = _delete(url, headers, data);
      break;
    case "PATCH":
      res = _patch(url, headers, data);
      break;
    default:
      break;
  }
  return res;
};

const seriveCaller = { call: _do_call };

export default seriveCaller;
