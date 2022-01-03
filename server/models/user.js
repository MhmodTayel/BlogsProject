const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 30,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      // required: true,
      minlength: 3,
    },
    lastName: {
      type: String,
      // required: true,
      minlength: 3,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    following: { type: [{ type: String }] },
    bio: {
      type: String,
      minlength: 10,
      maxlength: 100,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    toJSON: {
      transform: (doc, ret, opts) => {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", function () {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
