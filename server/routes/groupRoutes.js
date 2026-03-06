const express = require("express");

const { registerGroup, getGroupById } = require("../controllers/groupController");

const router = express.Router();

router.post("/register-group", registerGroup);

router.get("/group/:groupId", getGroupById);

module.exports = router;
