const mongoose = require("mongoose");
const path = require("path");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/test");
    console.log("MongoDB Connection successful");
  } catch (error) {
    console.log("MongoDB Connection Failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
