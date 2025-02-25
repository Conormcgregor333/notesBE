const notes = require("../../Model/notes");

const getNotes = async (req, res) => {
  const { isFav, sort } = req.query;
  console.log(sort, isFav);

  let findObj = {};
  if (isFav) {
    findObj.is_fav = isFav === "true";
  }

  let sortObj = {};
  if (sort) {
    let sortingArray = sort.split(",");

    const invalid = sortingArray.some((item) => {
      const [field, order] = item.split(":");

      if (!field || (order !== "asc" && order !== "desc")) {
        res.status(400).send({
          error:
            "Incorrect format for sorting! Use 'field:asc' or 'field:desc'.",
        });
        return true; // Stop execution
      }

      sortObj[field] = order === "asc" ? 1 : -1;
      return false; // Continue iteration
    });

    if (invalid) return; // Prevent further execution if sorting format is invalid
  }

  try {
    let allNotes = await notes.find(findObj).sort(sortObj);
    res.status(200).send({ data: allNotes });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { getNotes };
