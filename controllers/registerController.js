const UserDB = require("../Model/Users");
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
require("dotenv").config();
function decryptPassword(encryptedPassword) {
  const bytes = CryptoJS.AES.decrypt(
    encryptedPassword,
    process.env.PRIVATE_KEY
  );
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedPassword;
}

const registerUser = async (req, res) => {
  const { user, pwd, email } = req.body;
  console.log(pwd, "pwd");
  if (!user || !pwd || !email) {
    return res.status(400).send("User ,password and email are required");
  }
  const duplicate = await UserDB.findOne({ email });
  if (duplicate) {
    return res.status(400).send("User already exists");
  } else {
    try {
      // const decryptedPassword = decryptPassword(pwd);
      // console.log(pwd, "decrypted password!");
      const hashedPwd = await bcrypt.hash(pwd, 10);
      await UserDB.create({ user: user, password: hashedPwd, email: email });
      return res.status(201).send(`User ${user} registered successfully`);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
};
module.exports = {
  registerUser,
};
