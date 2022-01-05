const Blog = require("../models/blog");

const find = () => Blog.find({}).populate("author");
const findById = (id) => Blog.findOne({ id }).populate("author");
const create = (blog) => Blog.create(blog);
const deleteDoc = (_id) => {
  return Blog.deleteOne({ _id });
};
const update = (id, body) => Blog.updateOne({ id }, body);
module.exports = { find, create, deleteDoc, update, findById };
