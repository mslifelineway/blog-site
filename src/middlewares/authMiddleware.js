const { UserModel } = require("../models");
const { messages, roles, errors, statusCodes } = require("../utls/constants");
const jwt = require("jsonwebtoken");

exports.authenticateAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next({
      status: statusCodes.unauthorized,
      message: messages.authorizationTokenRequired,
    });
  }
  const token = authorization.split(" ")[1];
  if (!token)
    return next({
      status: statusCodes.unauthorized,
      message: messages.authorizationTokenRequired,
    });
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!user) {
      return res
        .status(401)
        .json({ message: messages.invalidAuthorizationToken });
    }
    const { role, exp } = user;
    const hasTokenExpired = UserModel.hasRefreshTokenExpired(exp);
    if (hasTokenExpired) {
      return next({
        status: statusCodes.unauthorized,
        message: messages.tokenExpired,
      });
    }
    if (role === roles.admin) {
      req.user = user;
      return next();
    }
    return res
      .status(statusCodes.forbidden)
      .json({ message: messages.accessDenied });
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return next({
        status: statusCodes.unauthorized,
        message: messages.tokenExpired,
      });
    }
    if (Object.keys(e).length === 0) {
      return next({
        message: messages.somethingWentWrong,
      });
    }
    return next({
      status: statusCodes.unauthorized,
      message: messages.invalidAuthorizationToken,
    });
  }
};
exports.authenticateContentWriter = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next({
      status: statusCodes.unauthorized,
      message: messages.authorizationTokenRequired,
    });
  }
  const token = authorization.split(" ")[1];
  if (!token)
    return next({
      status: statusCodes.unauthorized,
      message: messages.authorizationTokenRequired,
    });
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!user) {
      return res
        .status(401)
        .json({ message: messages.invalidAuthorizationToken });
    }
    const { role, exp } = user;
    const hasTokenExpired = UserModel.hasRefreshTokenExpired(exp);
    if (hasTokenExpired) {
      return next({
        status: statusCodes.unauthorized,
        message: messages.tokenExpired,
      });
    }
    if (role === roles.contentWriter) {
      req.user = user;
      return next();
    }
    return res
      .status(statusCodes.forbidden)
      .json({ message: messages.accessDenied });
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return next({
        status: statusCodes.unauthorized,
        message: messages.tokenExpired,
      });
    }
    if (Object.keys(e).length === 0) {
      return next({
        message: messages.somethingWentWrong,
      });
    }
    return next({
      status: statusCodes.unauthorized,
      message: messages.invalidAuthorizationToken,
    });
  }
};
