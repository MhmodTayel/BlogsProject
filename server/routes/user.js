const express = require("express");
const router = express.Router();
const upload = require('../middlewares/imgMW')

const {
  find,
  create,
  login,
  update,
  getFollowing,
  updateLike,
  getLikes
} = require("../controllers/user");

router.get("/", (req, res) => {
  find({})
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.get("/profile/:username", (req, res) => {
  const username = req.params.username
  find({username})
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.get("/following/:id", (req, res) => {
  const id = req.params.id;
  getFollowing(id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.get("/likes/:id", (req, res) => {
  const id = req.params.id;
  getLikes(id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.post("/register",upload.single("image"), (req, res, next) => {
  const user = req.body;
  user.image = req.file?.path;
  create(user)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.post("/login", async (req,res, next) => {
  const { username, password } = req.body;
  const token = await login({ username, password },next);
  res.json(token);
});

router.patch("/follow/:id", async (req, res, next) => {
  const username = req.body.username;
  const id = req.params.id;
  console.log(username, id);
  update(id, username)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});
router.patch("/like/:id", async (req, res, next) => {
  const blogId = req.body.blogId;
  const id = req.params.id;
  console.log(blogId, id);
  updateLike(id, blogId)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});
router.get("/users/:user/blog", (req, res) => {
  res.json(req.params.user);
});

module.exports = router;
