const express = require("express");
const router = express.Router();
const { createNote } = require("../../controllers/NotesController/create");
const { getNotes } = require("../../controllers/NotesController/get");
const { removeNote } = require("../../controllers/NotesController/remove");
const { editNote } = require("../../controllers/NotesController/edit");
const { getNote } = require("../../controllers/NotesController/getNote");
router
  .get("/", getNotes)
  .get("/:id", getNote)
  .post("/create", createNote)
  .delete("/remove/:id", removeNote)
  .patch("/edit/:id", editNote);
module.exports = router;
