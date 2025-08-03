const mongoose = require("mongoose");
const path = require("path");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://monu982:tNsYXHmnTZ2QwJ5u@student-management.d0kosv3.mongodb.net/?retryWrites=true&w=majority&appName=Student-management"
    );
    console.log("MongoDB Connection successful");
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
