const mongoose = require("mongoose");

exports.blogSchemaObj = {
  title: {
    type: String,
    required: true,
    min: 3,
    max: 500,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    min: 3,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  hasApproved: {
    type: Boolean,
    default: false,
  },
  hasDeleted: {
    type: Boolean,
    default: false,
  },
};
