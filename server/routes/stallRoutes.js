const express = require("express")
const { addStallPublic, getAllStalls } = require("../controllers/stallController")
const stallRouter = express.Router()

stallRouter.post("/register",addStallPublic);
stallRouter.get("/list",getAllStalls);

module.exports = stallRouter;