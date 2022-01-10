const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    body: {
      
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
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
          maxlength: 20,
        },
      ],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
