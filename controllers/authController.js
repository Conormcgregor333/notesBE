const UserDB = require("../Model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const CryptoJS = require("crypto-js");
function decryptPassword(encryptedPassword) {
  const bytes = CryptoJS.AES.decrypt(
    encryptedPassword,
    process.env.PRIVATE_KEY
  );
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedPassword;
}

const authenticateUser = async (req, res) => {
  const { user, pwd, email } = req.body;
  if (!user || !pwd || !email) {
    res.status(400).send("User, password and email are required");
  }
  // const foundUser = userDB.users.find((item) => item.user === user);
  const foundUser = await UserDB.findOne({ email }).exec();
  console.log(foundUser);
  if (!foundUser) {
    res.status(400).send("User not found");
  } else {
    try {
      // const decryptedPassword = decryptPassword(pwd);
      const result = await bcrypt.compare(pwd, foundUser.password);
      console.log(result);
      if (result) {
        console.log(process.env.ACCESS_TOKEN_SECRET);
        const access_token = jwt.sign(
          { email: foundUser.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "3000s" }
        );
        console.log("Access token: ", access_token);
        const refresh_token = jwt.sign(
          { email: foundUser.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        foundUser.refresh_token = refresh_token;
        await foundUser.save();
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          secure: true,
          sameSite: "None",
        });
        res.send({ token: access_token, id: foundUser?.id });
      } else {
        res.status(401).send("Invalid credentials");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
module.exports = { authenticateUser };
