const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  refresh_token: String,
});
module.exports = mongoose.model("user", usersSchema);
