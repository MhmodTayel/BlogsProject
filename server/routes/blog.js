const express = require("express");
const router = express.Router();
//--------------------------------//

// Handle IMG upload and store //

const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});
const upload = multer({ storage: storage });
// ---------------------------- //

const authorizeBlogMW = require("../middlewares/blogMW");
const {
  find,
  create,
  deleteDoc,
  update,
  findById,
  findBlogsByUserId,
} = require("../controllers/blog");

const Blog = require("../models/blog");

router.get("/", (req, res, next) => {
  find()
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

router.post("/create", upload.single("image"), async (req, res, next) => {
  const blog = req.body;
  blog.image = req.file.path;
  blog.author = req.user._id;

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
  console.log('from route');
  const id = req.params.id;
  const blog = req.body;
  blog.image = req.file?.path;

  update(id, blog)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

module.exports = router;
