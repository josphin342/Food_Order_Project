const express = require("express");
const restaurantController = require("../controllers/restauntController");
const router = express.Router({mergeParams=true});

const {protect}= require("../controllers/authController");
const {authorizeRoles}= require("../middleware/authorizeRoles");
