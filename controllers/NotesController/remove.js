const notes = require("../../Model/notes");
const removeNote = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send({ error: "Send ID of note to delete" });
  }
  try {
    const foundNote = await notes.findById(id);
    if (!foundNote) {
      return res.status(404).send({ error: "Note not found" });
    }
    await notes.findByIdAndDelete(id);
    res.status(200).send({ resp: "Note deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = { removeNote };
