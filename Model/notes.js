const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notesSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
  is_fav: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("notes", notesSchema);
