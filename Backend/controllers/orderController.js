const Order = require("../models/order");
const FoodItem = require("../models/foodItem");
const Cart = require("../models/cartModel");
const { ObjectId } = require("mongodb");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const dotenv = require("dotenv");

//setting up config file
dotenv.config({ path: "./config/config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create a new order   =>  /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  // console.log("id", req.body);
  const { session_id } = req.body;

  if (!session_id) {
  return next(
    new ErrorHandler("Stripe session ID is required.", 400)
  );
}

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["customer"],
  });

  if (session.payment_status !== "paid") {
  return next(
    new ErrorHandler("Payment has not been completed.", 400)
  );
}

const existingOrder = await Order.findOne({
  stripeSessionId: session.id,
});

if (existingOrder) {
  return res.status(200).json({
    success: true,
    order: existingOrder,
    alreadyCreated: true,
  });
}
  const cart = await Cart.findOne({ user: req.user._id })
    .populate({
      path: "items.foodItem",
      select: "name price images",
    })
    .populate({
      path: "restaurant",
      select: "name",
    });
    if (!cart || !cart.items.length) {
  return next(
    new ErrorHandler(
      "Cart is empty or order has already been created.",
      400
    )
  );
}

 const address =
  session.shipping_details?.address ||
  session.customer_details?.address;

if (!address) {
  return next(
    new ErrorHandler(
      "Delivery address was not provided by Stripe.",
      400
    )
  );
}

let deliveryInfo = {
  address: [
    address.line1,
    address.line2,
  ]
    .filter(Boolean)
    .join(" "),

  city: address.city,

  phoneNo:
    session.customer_details?.phone || "Not provided",

  postalCode: address.postal_code,

  country: address.country,
};

  let orderItems = cart.items.map((item) => ({
    name: item.foodItem.name,
    quantity: item.quantity,
    image: item.foodItem.images[0].url,
    price: item.foodItem.price,
    fooditem: item.foodItem._id,
  }));

  let paymentInfo = {
    id: session.payment_intent,
    status: session.payment_status,
  };

  const order = await Order.create({
  orderItems,
  deliveryInfo,
  paymentInfo,

  stripeSessionId: session.id,

  deliveryCharge: +session.shipping_cost.amount_subtotal / 100,
  itemsPrice: +session.amount_subtotal / 100,
  finalTotal: +session.amount_total / 100,
  user: req.user.id,
  restaurant: cart.restaurant._id,
  paidAt: Date.now(),
});

  await Cart.findOneAndDelete({ user: req.user._id });

  res.status(200).json({
    success: true,
    order,
  });
});

// Get single order   =>   /api/v1/orders/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("restaurant")
    .exec();

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  // Customers can only view their own orders.
  // Admins can view any order.
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorHandler("You are not authorized to view this order", 403)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  // Get the user ID from req.user
  const userId = new ObjectId(req.user.id);
  // Find orders for the specific user using the retrieved user ID
  const orders = await Order.find({ user: userId })
    .populate("user", "name email")
    .populate("restaurant")
    .exec();

  res.status(200).json({
    success: true,
    orders,
  });
});
//update order status   =>   /api/v1/admin/order/:id
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const updateData = {
    orderStatus: req.body.orderStatus,
  };

  if (req.body.orderStatus === "Delivered") {
    updateData.deliveredAt = Date.now();
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});
// Get all orders - ADMIN  =>   /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("restaurant", "name")
    .sort({ createdAt: -1 });

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.finalTotal;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
    
