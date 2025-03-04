const express = require("express");
const { generateKeyPairSync } = require("crypto");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
//importing the third party middleware
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { NotesDbConnection } = require("./config/NotesDB");
// const { publicKey, privateKey } = generateKeyPairSync("rsa", {
//   modulusLength: 2048, // Key size (2048-bit recommended for security)
//   publicKeyEncoding: {
//     type: "spki",
//     format: "pem",
//   },
//   privateKeyEncoding: {
//     type: "pkcs8",
//     format: "pem",
//   },
// });

// console.log("Public Key:\n", publicKey);
// console.log("Private Key:\n", privateKey);
require("dotenv").config();
app.use(cookieParser());
//using the third party middleware

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allows cookies to be sent/received
  })
);

//using a custom middleware for looging request method and path name
app.use((req, res, next) => {
  console.log(req.method, " ", req.path);
  next();
});
NotesDbConnection();
//using some built in middlewares
app.use(express.urlencoded({ extended: true }));

//middleware to parse the JSON requests
app.use(express.json());

app.use(express.static(path.join(__dirname, "/Public")));
app.use("/home", express.static(path.join(__dirname, "/Public")));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/loguot"));
app.use(require("./middleware/verifyToken"));
app.use("/user", require("./routes/userInfo"));
app.use("/home", require("./routes/root"));
app.use("/notes", require("./routes/notesRoutes/routes"));

//page not found handling [404 status code]
app.all("*", (req, res) => {
  res.status(404);
  console.log(req.accepts());
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  }
});

//inserting sample data into the DB -
// const sampleData = require("./Model/sampleData");
// const notesDB = require("./Model/notes");
// notesDB
//   .insertMany(sampleData)
//   .then(() => {
//     console.log("Sample data inserted into the DB.");
//   })
//   .catch(() => {
//     console.log("Failed to insert the sample data into the DB.");
//   });

//listening to the PORT only when the DB connection is successful

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected ✅");
  app.listen(PORT, () => {
    console.log("Listening to port ", PORT);
  });
});
//testing 2
