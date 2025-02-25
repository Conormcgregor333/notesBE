const mongoose = require("mongoose");

const NotesDbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.error("MongoDB Connection Error ❌:", err);
  }
};

module.exports = { NotesDbConnection };
