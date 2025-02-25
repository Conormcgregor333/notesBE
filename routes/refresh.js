const express = require("express");
const router = express.Router();
const { refreshTokenAccess } = require("../controllers/refreshController");
router.get("/", refreshTokenAccess);
module.exports = router;
