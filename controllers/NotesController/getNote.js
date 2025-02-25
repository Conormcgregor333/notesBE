const notes = require("../../Model/notes");
const getNote = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send({ error: "Send ID of note to get" });
  }
  try {
    const foundNote = await notes.findById(id);
    if (!foundNote) {
      return res.status(404).send({ error: "Note not found" });
    }
    res.status(200).send({ data: foundNote });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
module.exports = { getNote };
