const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const blogsRoutes = require("./routes/blog");
const usersRoutes = require("./routes/user");
const authMiddleware = require("./middlewares/auth");
const app = express();
app.use(cors());

process.env.SECRET = "fbsbMRFBrbweSB818!@$^$(@)%sfbsb";
mongoose.connect("mongodb://localhost:27017/blogsApp");

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/users", usersRoutes);
app.use(authMiddleware);
app.use("/", blogsRoutes);

app.use("*", (req, res) => {
  res.status(404).end();
});

app.use((err, req, res, next) => {
  res.status(403).json( err);
});

app.listen(3000, () => {
  console.log("Connection Started on port 3000");
});
