const express = require("express");
const router = express.Router();
const { createOrder, getPublicKey } = require("../controllers/paymentController");

router.post("/order", createOrder);

router.get("/key", getPublicKey);

module.exports = router;
