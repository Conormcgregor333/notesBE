const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.DATABASE_URI, "DB URI");
const NotesDbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.error("MongoDB Connection Error ❌:", err);
  }
};

module.exports = { NotesDbConnection };
