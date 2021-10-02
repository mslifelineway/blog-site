const { _copy } = require("../helpers/helpers");
const { BlogModel } = require("../models");
const { statusCodes, messages } = require("../utls/constants");

exports.createBlog = async (req, res, next) => {
  try {
    const savedBlog = await new BlogModel(req.body).save();
    if (savedBlog) {
      return res
        .status(statusCodes.created)
        .json({ message: messages.blogCreated, result: _copy(savedBlog) });
    }
    return next({
      message: messages.blogNotCreated,
    });
  } catch (e) {
    next(e);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: req.body.id },
      req.body
    );
    if (updatedBlog) {
      return res.status(statusCodes.noContent).send();
    }
    return next({
      message: messages.userNotExists,
      status: statusCodes.notFound,
    });
  } catch (e) {
    const { path } = e;
    if (path) {
      e.message = messages.invalidUserId;
    }
    next(e);
  }
};
exports.findBlogById = async (req, res, next) => {
  try {
    const blog = await this.findOne({
      _id: id,
      hasApproved: true,
      hasDeleted: false,
    }).populate({
      path: "user",
      select: { name: 1 },
    });
    return res
      .status(statusCodes.success)
      .json({ result: _copy(blog), message: messages.blogFetched });
  } catch (e) {
    const { path } = e;
    if (path) {
      e.message = messages.invalidBlogId;
    }
    next(e);
  }
};
exports.findAllBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogModel.find({
      hasDeleted: false,
    }).populate({
      path: "user",
      select: { name: 1 },
    });
    return res
      .status(statusCodes.success)
      .json({ result: _copy(blogs), message: messages.blogsFetched });
  } catch (e) {
    next(e);
  }
};
exports.findActiveBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogModel.find({
      hasApproved: true,
      hasDeleted: false,
    });
    return res
      .status(statusCodes.success)
      .json({ result: _copy(blogs), message: messages.blogsFetched });
  } catch (e) {
    next(e);
  }
};
exports.findDisApprovedBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogModel.find({
      hasApproved: false,
      hasDeleted: false,
    });
    return res
      .status(statusCodes.success)
      .json({ result: _copy(blogs), message: messages.blogsFetched });
  } catch (e) {
    next(e);
  }
};
exports.approveBlog = async (req, res, next) => {
  try {
    const blog = await BlogModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        hasApproved: true,
        hasDeleted: false,
      }
    );
    return res
      .status(statusCodes.success)
      .json({ message: messages.blogApproved, result: blog });
  } catch (e) {
    const { path } = e;
    if (path) {
      e.message = messages.invalidBlogId;
    }
    next(e);
  }
};
exports.softDeleteBlogById = async (req, res, next) => {
  try {
    await BlogModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        hasDeleted: true,
        hasApproved: false,
      }
    );
    return res
      .status(statusCodes.noContent)
      .json({ message: messages.blogDeleted });
  } catch (e) {
    const { path } = e;
    if (path) {
      e.message = messages.invalidBlogId;
    }
    next(e);
  }
};
