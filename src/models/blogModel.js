const mongoose = require("mongoose");
const { schemaOptions } = require("../helpers/helpers");
const _ = require("lodash");
const { statusCodes } = require("../utls/constants");
const { blogSchemaObj } = require("../schemas/blog");

const blogSchema = new mongoose.Schema(blogSchemaObj, schemaOptions);

blogSchema.statics.findByUserId = async function (id) {
  const blog = await this.findOne({ user: id });
  if (!blog) {
    return Promise.reject({ status: statusCodes.notFound });
  }
  return blog;
};

module.exports = mongoose.model("blogs", blogSchema);
