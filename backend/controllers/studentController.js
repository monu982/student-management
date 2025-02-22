const Student = require("../models/Student");
const { studentSchema } = require("../schemaValidation");
const { mongoose } = require("mongoose");
const registerStudent = async (req, res) => {
  try {
    // Check request data Validate
    const { error } = studentSchema.validate(req.body);
    if (error) {
      return res.status(409).json({ error: error.details[0].message });
    }

    // check if email alreqdy exists
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Add new Student
    const student = new Student(req.body);
    console.log(student);
    await student.save();
    res
      .status(201)
      .json({ message: "Student registered successfully", student });
  } catch (err) {
    // Duplicate key error
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0]; // Get the field that caused the error
      err_mess = `${field} must be unique. ${err.keyValue[field]} is already taken.`;
      res.status(409).json({ message: err_mess });
    } else {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Search students by name
const searchStudents = async (req, res) => {
  try {
    const { name } = req.query;
    const students = await Student.find({
      name: { $regex: name, $options: "i" }, // Case-insensitive search
    });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get Student Data from id
const getStudentData = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // we fetch the student data
    const student = await Student.findById(id);

    // Check if student data is not found
    if (!student) {
      return res.status(404).json({ error: "Student Data not found" });
    }
    // send the student data successfully
    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error.message);
    res.status(500).json({ error: "Server error while fetching student data" });
  }
};

const deleteStudentData = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error.message);
    res.status(500).json({ error: "Server error while deleting student" });
  }
};

module.exports = {
  registerStudent,
  getAllStudents,
  searchStudents,
  getStudentData,
  deleteStudentData,
};
