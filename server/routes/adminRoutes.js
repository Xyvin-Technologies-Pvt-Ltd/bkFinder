const express = require("express");
const router = express.Router();
const { addUser } = require("../controllers/userController");
const { addStall } = require("../controllers/stallController");
const { createAward } = require("../controllers/awardController");
const upload = require("../middleware/uploadMemory");

// Admin manual user creation endpoints (no payment, same logic as public endpoints)
router.post("/users/register", upload.single("photo"), addUser);
router.post("/stall/register", addStall);
router.post("/awards/create", createAward);

module.exports = router;
