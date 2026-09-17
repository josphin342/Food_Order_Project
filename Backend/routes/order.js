const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  updateOrderStatus,
  allOrders,
} = require("../controllers/orderController");

const authController = require("../controllers/authController");
const { authorizeRoles } = require("../middleware/authorizeRoles");

router.route("/new").post(authController.protect, newOrder);
router.route("/me/myOrders").get(authController.protect, myOrders);

router
  .route("/admin/all")
  .get(authController.protect, authorizeRoles("admin"), allOrders);

router
  .route("/:id/status")
  .patch(authController.protect, authorizeRoles("admin"), updateOrderStatus);

router.route("/:id").get(authController.protect, getSingleOrder);


module.exports = router;