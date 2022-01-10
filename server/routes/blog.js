

const express = require("express");
const router = express.Router();
//--------------------------------//

// Handle IMG upload and store //
const upload = require('../middlewares/imgMW')

// ---------------------------- //

const authorizeBlogMW = require("../middlewares/blogMW");
const {
  find,
  create,
  deleteDoc,
  update,
  findById,
  getLength,
  findBlogsByUserId,
  findBlogsByTitle,
  getTags,
  getBlogsByTag
} = require("../controllers/blog");

const Blog = require("../models/blog");

router.get("/", (req, res, next) => {

  const pageSize = req.query.pageSize
  const pageIndex = req.query.pageIndex
  console.log(+pageSize,+pageIndex);

  find(+pageIndex,+pageSize || 10)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.get("/length", (req, res, next) => {

  getLength()
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.get("/get/tags", (req, res, next) => {

  getTags()
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.get("/getBlogs/:tag", (req, res, next) => {

  getBlogsByTag(req.params.tag)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.get("/following/:id", (req, res, next) => {
  const id = req.params.id;
  findBlogsByUserId(id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.get("/:id", (req, res, next) => {
  findById(req.params.id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});
router.get("/search/title", async(req, res, next) => {
  const title = req.query.title;
  findBlogsByTitle(title)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
  });
router.post("/create", upload.single("image"), async (req, res, next) => {
  const blog = req.body;
  blog.image = req.file.path;
  blog.author = req.user._id;
  blog.tags = blog.tags.split(' ')
  const database = await Blog.find({});
  const length = database.length;
  blog.id = length + 1;
  create(blog)
    .then((doc) => res.json(doc))
    .catch((e) => {
      console.log(e);
      next(e);
    });
});

router.delete("/:id", authorizeBlogMW, (req, res, next) => {
  const id = req.params.id;

  deleteDoc(id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.patch("/:id", authorizeBlogMW,upload.single("image"), (req, res, next) => {
  
  
  const id = req.params.id;
  const blog = req.body;
  blog.image = req.file?.path;

  update(id, blog)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

module.exports = router;
