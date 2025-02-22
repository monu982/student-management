const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "Name is too short."],
    maxLength: [25, "Name is too long."],
    trim: true,
    required: [true, "Name is required."],
    validate: {
      validator: function (value) {
        return /^[A-Za-z\s]+$/.test(value); // Only allows alphabets and spaces.
      },
      message: "Name must contain only alphabets and spaces.",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format. Please enter a valid email address.",
    },
  },
  age: {
    type: Number,
    min: [10, "Age is too low."],
    max: [100, "Age is too high."],
    required: [true, "Age is required"],
    validate: {
      validator: Number.isInteger,
      message: "Age must be a Integer.",
    },
  },
  course: {
    type: String,
    trim: true,
    required: [true, "Course is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

// email unqiue message is not send
