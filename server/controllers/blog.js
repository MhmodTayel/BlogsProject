const Blog = require("../models/blog");

const find = (pageIndex,pageSize) => Blog.find({}).limit(pageSize).skip(pageSize*pageIndex).populate("author");
const getLength = () => Blog.find({})
const findById = (id) => Blog.findOne({ id }).populate("author");
const create = (blog) => Blog.create(blog);
const deleteDoc = (_id) => {
  return Blog.deleteOne({ _id });
};
const findBlogsByTitle = (title)=> {
  const regex = new RegExp(title)
  return Blog.find(
  {title: {$regex: regex}}).populate('author')};

const update = (_id, body) => Blog.updateOne({ _id }, body);
findBlogsByUserId = (_id) => Blog.find({ author: _id }).populate("author");
const getTags= ()=> Blog.find({},{tags:1,_id:0})
const getBlogsByTag= (tag)=> Blog.find({tags:tag}).populate("author")
module.exports = {
  find,
  create,
  deleteDoc,
  update,
  findById,
  findBlogsByUserId,
  getLength,
  findBlogsByTitle,
  getTags,
  getBlogsByTag
};
