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
    image: {
      type:String
    },
    id: {
      type: Number,
      default: 0,
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
