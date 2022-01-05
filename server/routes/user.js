const express = require("express");
const router = express.Router();
const { find, create, login } = require("../controllers/user");

router.get("/", (req, res) => {
  find()
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.post("/register", (req, res, next) => {
  const user = req.body;
  create(user)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const token = await login({ username, password });
  res.json(token);
});
router.get("/users/:user/blog", (req, res) => {
  res.json(req.params.user);
});

module.exports = router;
