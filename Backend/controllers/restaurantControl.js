const restaurant = require("../models/restaurant");
const ErrorHandler= require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
//Fetch restaurants based on search and sort
exports.getAllRestaurants = catchAsyncErrors(async(req,res,next) =>{
    const apiFeatures = new APIFeatures(Restaurant.find(),req.query)
    .search()
    .sort();

    const restaurants = await apiFeatures.query();
    res.status(200).json({
        status:"succuss",
        count:restaurants.length,
        restaurants:resta
    });
});

//creating new restaurant
exports.createRestaurent = catchAsyncErrors(async(req,res,next)=>{
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json({
        status:"succuss",
        data: restaurant,
    });
});

//fetching one restaurant
exports.getRestaurant=catchAsyncErrors(async(req,res,next)=>{
    const restaurant = await Restaurant.findById(req.params.id);
    if(!restaurant)
        return next(new ErrorHandler("Restaurant not found",404));
    res.status(200).json({
        status:"succuss",
        data: restaurant,
    });
});

//Delete restaurant
exports.deleteRestaurant=catchAsyncErrors(async(req,res,next)=>{
    const restaurant = await Restaurant.findById(req.params.storeId);
    if(!restaurant)
        return next(new ErrorHandler("Restaurant not found",404));
    res.status(204).json({
        status:"succuss",
       
    });
});