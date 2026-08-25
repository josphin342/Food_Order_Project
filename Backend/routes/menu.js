const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAllMenu,
  createMenu,
  deleteMenu,
  addItemsToMenu,
} = require("../controllers/menuController");

const { protect } = require("../controllers/authController");
const { authorizeRoles } = require("../middleware/authorizeRoles");

router
  .route("/")
  .get(getAllMenu)
  .post(protect, authorizeRoles("admin"), createMenu);

// add food item to a specific menu (more specific, must come before /:menuId)
router
  .route("/:menuId/addItems")
  .patch(protect, authorizeRoles("admin"), addItemsToMenu);

router.route("/:menuId").delete(protect, authorizeRoles("admin"), deleteMenu);

module.exports = router;