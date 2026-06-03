 const mongoose = require("mongoose");
 const validator = require("validator");
 const bcrypt = require("bcryptjs");
 const jwt = require("jsonwebtoken"); 

 //implementing the user schema
 const userSchema = new mongoose.Schema({
        name:{
            type: String,
            required:[true, "Please enter your name" ],
            maxlength:[30, "Name cannot exceed 30 characters"],

        },

        email: {
            type: String,
            required: [true, "Please enter email"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please enter a valid email"],
        },

        password: {
            type: String,
            required: [true, "Please enter password"],
            minlength: [6, "Password should be at least 6 characters"],
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (e1) {
                    return e1 === this.password;
                },
                message: "Passwords do not match",
            },
        },

        phoneNumber: {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
        },

        role: {
            type: String,
            enum: ["user", "restaurent-owner", "admin"],
            default: "user",
        },

        avatar: {
            public_id: String,
            url: String,
        },

        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        },
       {timeStamps: true },
 );

 //hashing the password before saving the user
    userSchema.pre("save", async function () {
        if (!this.isModified("password")) return; 

        this.password = await bcrypt.hash(this.password, 12);
        this.passwordConfirm = undefined;
    });
         
//create jwt token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id },process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//compare password
userSc

module.exports = mongoose.model("User", userSchema);