// import express app

const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get(
    "/profile",
    authController.protect,
    authController.getUserProfile
);

router.put(
    "/me/update",
    authController.protect,
    authController.updateProfile
);

router.post("/password/forgot", authController.forgotPassword);

router.patch("/passwordreset/:token", authController.resetPassword);

router.put(
    "/password/update",
    authController.protect,
    authController.updatePassword
);

module.exports = router;