// Import mongoose package
const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    })
    .catch((err) => {
      console.log(`MongoDB connection error: ${err.message}`);
      process.exit(1);
    });
};

module.exports = connectDatabase;