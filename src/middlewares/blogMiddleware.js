const {
  createBlogSchema,
  updateBlogSchema,
} = require("../schemaValidations/blogSchemaValidation");
const { statusCodes } = require("../utls/constants");

exports.validateSchema = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    await createBlogSchema().validateAsync(req.body);
    return next();
  } catch (e) {
    if (e.details) {
      const details = e.details[0];
      e.status = statusCodes.unproccessible;
      if (details.type === "any.required") e.status = statusCodes.badRequest;
      e.message = details.message;
    }
    next(e);
  }
};

exports.validateUpdateSchema = async (req, res, next) => {
  try {
    req.body.id = req.params.id;
    await updateBlogSchema().validateAsync(req.body);
    return next();
  } catch (e) {
    if (e.details) {
      const details = e.details[0];
      e.status = statusCodes.unproccessible;
      if (details.type === "any.required") e.status = statusCodes.badRequest;
      e.message = details.message;
    }
    next(e);
  }
};
