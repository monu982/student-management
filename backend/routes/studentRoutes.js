const express = require("express");
const {
  registerStudent,
  getAllStudents,
  searchStudents,
  getStudentData,
  deleteStudentData,
} = require("../controllers/studentController");
const router = express.Router();

router.get("/", getAllStudents); // Fetch all students

router.post("/register", registerStudent); // Endpoint for student registration

router.get("/search", searchStudents); // Search students by name

router.get("/:id", getStudentData); // Search students by id

router.delete("/:id", deleteStudentData); // Delete student

module.exports = router;
