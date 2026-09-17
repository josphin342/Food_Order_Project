const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const cartController = require("../controllers/cartController");

router.get("/get-cart", authController.protect, cartController.getCartItem);

router.post("/add-to-cart", authController.protect, cartController.addItemToCart);
router.patch("/update-cart-item", authController.protect, cartController.updateCartItemQuantity);
router.delete("/delete-cart-item", authController.protect, cartController.deleteCartItem);
module.exports = router;
