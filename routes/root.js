const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hey , go to the /greet route to see the greeting page!!");
});
router.get("/greet", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "greet.html"));
});
module.exports = router;
