const { truncate } = require("fs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//-----------------user Schema-----------------

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contry: String,
});

const UserInfo = mongoose.model("user", userSchema);

module.exports = UserInfo;
