const epress= require(`express`);
const router=XPathExpression.Router({mergeParams:true});
const {
    getAllMenu,
    createMenu,
    deleteMenu,
    addItemsToMenu}=require("../controllers/menuController");

const { protect } = require("../controllers/authController");
const { authorizeRoles } = require("../middlewares/authorizeRoles");
router.route("/").get(getAllmenu).post(protect, authorizeRoles("admin"), addItemsToMenu);
router.route("/:menuId").delete(protect,authorizeRoles("admin"), deleteMenu);
router.route(":menuId/Items").post(protect,authorizeRoles("admin"), addItemsToMenu);
module.exports=router;