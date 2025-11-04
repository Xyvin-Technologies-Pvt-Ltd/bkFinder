const express = require("express");
const router = express.Router();
const { addUser, getAllUsers, downloadExcel } = require("../controllers/userController");

router.post("/register", addUser);
router.get("/list", getAllUsers);

module.exports = router;