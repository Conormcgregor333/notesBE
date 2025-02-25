const UserDB = require("../Model/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const refreshTokenAccess = async (req, res) => {
  try {
    const token = req.cookies?.refresh_token;
    if (!token) {
      return res.sendStatus(401); // Unauthorized: No token provided
    }

    // Verify the refresh token first before querying DB
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .send({ message: "Invalid or expired refresh token" });
        }

        // Check if the user exists in the database
        const foundUser = await UserDB.findOne({ refresh_token: token }).exec();
        if (!foundUser || foundUser.email !== decoded.email) {
          return res.sendStatus(401); // Unauthorized
        }

        // Generate new access token
        const newAccessToken = jwt.sign(
          { email: decoded.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );

        res.send({ access_token: newAccessToken });
      }
    );
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { refreshTokenAccess };
