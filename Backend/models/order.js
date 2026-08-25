const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  deliveryInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      fooditem: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "FoodItem",
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
  },

  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    default: 0.0,
  },
  deliveryCharge: {
    type: Number,
    default: 0.0,
  },
  finalTotal: {
    type: Number,
    required: true,
    default: 0.0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//stock Management
//before saving the order,
//1. check the each foodItem 
//2.verify stock
//3.reduce stock
//4. save the order
//pre save middleware is going to be used for managing stock

//user places the order
//backend receives the order
//before saving the order => check the stock of each foodItem
//if stock is available => reduce the stock of each foodItem
//if stock is not available => return response to user => "stock not available"

orderSchema.pre("save", async function (next) {
  try {
    for (const orderItem of this.orderItems) {
      const foodItem = await mongoose
        .model("FoodItem")
        .findById(orderItem.fooditem);
      if (!foodItem) {
        throw new Error("Food item not found.");
      }

      if (foodItem.stock < orderItem.quantity) {
        throw new Error(
          `Insufficient stock for '${orderItem.name}' in this order.`
        );
      }

      foodItem.stock -= orderItem.quantity;
      await foodItem.save();
    }

    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("Order", orderSchema);