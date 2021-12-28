const express = require("express");
const router = express.Router();
const { find, create } = require("../controllers/blog");

router.get("/", (req, res) => {
  find()
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.post("/", (req, res, next) => {
  const blog = req.body;
  create(blog)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.get("/users/:user/blog", (req, res) => {
  res.json(req.params.user);
});

module.exports = router;
