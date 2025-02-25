const notes = require("../../Model/notes");
const editNote = async (req, res) => {
  const { title, text } = req.body;
  const { id } = req.params;
  const { is_fav } = req.query;
  if (!title && !text) {
    res.status(400).send({ error: "Title and text are required" });
  }
  try {
    const foundNote = await notes.findById(id);
    if (!foundNote) {
      return res.status(404).send({ error: "Note not found" });
    }
    foundNote.title = title;
    foundNote.text = text;
    if (is_fav) {
      foundNote.is_fav = is_fav;
    }
    foundNote.save();
    return res.status(200).send({ resp: "Note updated" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = { editNote };
