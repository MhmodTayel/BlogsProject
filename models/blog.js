const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
    },
    body: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 20,
    },
    img: {
      data: Buffer,
      contentType: String,
      required: true,
    },
    author: {
      type: String,
    },
    tags: {
      type: [
        {
          type: String,
          maxlength: 10,
        },
      ],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
