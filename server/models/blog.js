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
      maxlength: 50,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
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
