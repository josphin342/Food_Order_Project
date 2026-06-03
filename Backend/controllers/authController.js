
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/sendToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/user");
const ErrorHandler =require("../utils/errorHandler");
//register a user
exports.signup = catchAsyncErrors(async (req, res) => {
  const { name, email, password, passwordConfirm, phoneNumber } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    phoneNumber,
  });

  sendToken(user, 200, res);
});

//login user
exports.Login = catchAsyncErrors(async(req, res,next) => {
    const {email,password}=req.body;
    //check if email and password is entered by user
     if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400));
     }
     const user = await User.findOne({email}).select("+password");

     if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
     }

});