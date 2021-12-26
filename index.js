const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/blogsApp");

app.use(express.json());

app.use("*", (req, res) => {
  res.status(404).end();
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("Connection Started on port 3000");
});
