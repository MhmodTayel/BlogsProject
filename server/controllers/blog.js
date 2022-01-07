const Blog = require("../models/blog");

const find = () => Blog.find({}).populate("author");
const findById = (id) => Blog.findOne({ id }).populate("author");
const create = (blog) => Blog.create(blog);
const deleteDoc = (_id) => {
  return Blog.deleteOne({ _id });
};
const update = (_id, body) => Blog.updateOne({ _id }, body);
findBlogsByUserId = (_id) => Blog.find({ author: _id }).populate("author");
module.exports = {
  find,
  create,
  deleteDoc,
  update,
  findById,
  findBlogsByUserId,
};
