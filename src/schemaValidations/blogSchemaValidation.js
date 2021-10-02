const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const labels = {
  title: "Title",
  content: "Content",
  user: "User",
};
exports.createBlogSchema = () => {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .min(3)
      .max(500)
      .required()
      .messages({
        "string.base": `${labels.title} should be a type of 'text'.`,
        "string.empty": `${labels.title} should not be empty.`,
        "string.min": `${labels.title} must contain min {#limit} chars.`,
        "string.max": `${labels.title} should not have more than {#limit} chars.`,
        "any.required": `${labels.title} is required.`,
      }),
    content: Joi.string()
      .trim()
      .min(3)
      .required()
      .messages({
        "string.base": `${labels.content} should be a type of 'text'.`,
        "string.empty": `${labels.content} should not be empty.`,
        "string.min": `${labels.content} must contain min {#limit} chars.`,
        "any.required": `${labels.content} is required.`,
      }),
    user: Joi.objectId()
      .empty()
      .required()
      .messages({
        "string.base": `'${labels.user}' should be a type of 'objectId'.`,
        "string.empty": `'${labels.user}' should not be empty.`,
        "string.pattern.name": `Access denied! You don't have permission.`,
        "any.required": `${labels.user} is required'.`,
      }),
  });
  return schema;
};
exports.updateBlogSchema = () => {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .min(3)
      .max(500)
      .required()
      .messages({
        "string.base": `${labels.title} should be a type of 'text'.`,
        "string.empty": `${labels.title} should not be empty.`,
        "string.min": `${labels.title} must contain min {#limit} chars.`,
        "string.max": `${labels.title} should not have more than {#limit} chars.`,
        "any.required": `${labels.title} is required.`,
      }),
    content: Joi.string()
      .trim()
      .min(3)
      .required()
      .messages({
        "string.base": `${labels.content} should be a type of 'text'.`,
        "string.empty": `${labels.content} should not be empty.`,
        "string.min": `${labels.content} must contain min {#limit} chars.`,
        "any.required": `${labels.content} is required.`,
      }),
  });
  return schema;
};
