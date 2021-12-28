const express = require("express");
const router = express.Router();
const authorizeBlogMW = require("../middlewares/blogMW");
const { find, create, deleteDoc, update } = require("../controllers/blog");

router.get("/", (req, res) => {
  find()
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.post("/", (req, res, next) => {
  const blog = req.body;
  blog.author = req.user.username;
  create(blog)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.delete("/:id", authorizeBlogMW, (req, res, next) => {
  const id = req.params.id;
  deleteDoc(id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.patch("/:id", authorizeBlogMW, (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  update(id, body)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

module.exports = router;