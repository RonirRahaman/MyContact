const express = require("express");
const { ezymadeData } = require("../controllers/ezymadeController");
const router = express.Router();

router.post("/save", ezymadeData);

module.exports = router;
