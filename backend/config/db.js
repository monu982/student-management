const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connection successful");
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
