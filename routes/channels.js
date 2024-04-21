const express = require("express");
const channelsController = require("../controllers/channelsController");

const router = express.Router();

router.post("/create", channelsController.create);

module.exports = router;
