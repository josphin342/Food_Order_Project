//show all menu
//  create menu
// delete menu
// add items into menu
const Menu= require("../models/menu");
const ErrorHandler =require("../utils/errorHandler");
const catchAsync= require("../middleware/catchAsyncErrors");

//get all menu
exports.getAllMenu=catchAsync(async(req,res,next)=>{
    //filter logic
    // 2 cases: 1.restaurant exist=> so particular restaurant menu
    //          2.rastaurant not exist =>so all menus
    const filter=req.params.storeId ? {restaurant:req.params.storeId}:{}

    //fetch data from database
     const menu=await Menu.find(filter).populate("menu.items")
     res.status(200).json({
        status:"success",
        count=menu.length,
        data:menu
     })

});
//create menu
exports.createMenu= catchAsync(async(req,res,next)=>{
    const menu =await Menu.crate(req.body);
    res.status(201).json({
        status:"success",
        data:menu
    })
});
//delete menu
exports.deleteMenu=catchAsync(async(req,res,next)=>{
    const menu=await Menu.findByIdAndDelete(req.params.menuId);
    if(!menu){
        return next (new ErrorHandler("No menu found with that Id",404))

    }
    res.status(204).json({
        status:"success"
    })

});
//add items into menu
exports.addItemsToMenu=catchAsync(async(req,res,next)=> {
    const {category,foodItemIditems}=req.body;
    if(!menuId){
        return next(new ErrorHandler("Please provide menuId",400))
    }
    const menu =await Menu.findById(menuId);
    if(!menu){
        return next(new ErrorHandle("No menu found with that Id",404))
    }
//find categories
let cat=menu.menu.find((c) => c.category === category);

// if cat not found then crate new one
if(!cat){
    cat={category,items:[]}
    menu.menu.push(cat);
}
//add items to category
cat.items.push(foodItemId);
await menu.save();
await menu.populate("menu.items")
res.status(200).json({
    status:"success",
    data:menu
})

})