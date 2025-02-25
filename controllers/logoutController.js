const UserDB = require("../Model/Users");
const logoutUser = async (req, res) => {
  //log req with acc token and ref in cookie
  // BE checks token
  //if valid clears the cookie , deletes ref token from DB and FE clears he acc token from memory
  // if invalid sends 403
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  const foundUser = await UserDB.findOne({
    refresh_token: refreshToken,
  }).exec();
  if (!foundUser) {
    res.clearCookie("refresh_token");
    return res.sendStatus(403);
  }
  foundUser.refresh_token = "";
  foundUser.save();
  res.clearCookie("refresh_token");
  res.status(200).send("Logged out successfully");
};
module.exports = { logoutUser };
