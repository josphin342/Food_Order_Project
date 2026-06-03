//import express app
const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
//router.post("/login");
//router.get("/logout");

module.exports = router;