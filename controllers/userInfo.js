const userDB = require("../Model/Users");
const getUserInfo = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required." });
  }
  console.log(id);
  const foundUser = await userDB.findById(id);
  console.log(foundUser);
  if (!foundUser) {
    return res.status(404).json({ message: "User Not Found" });
  }
  const { password, ...rest } = foundUser._doc;
  res.status(200).json({ user: rest });
};
module.exports = { getUserInfo };
