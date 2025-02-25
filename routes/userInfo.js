const express = require("express");
const router = express.Router();
const { getUserInfo } = require("../controllers/userInfo");
router.get("/:id", getUserInfo);
module.exports = router;
