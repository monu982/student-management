import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  fetchStudents,
  searchStudents,
  deleteStudent,
} from "../api/studentApi";

function StudentList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        setError(error.message || "Failed to fetch students.");
      }
    };
    getStudents();
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    setError(""); // Reset errors before searching

    try {
      if (query) {
        const data = await searchStudents(query);
        setStudents(data);
      } else {
        const data = await fetchStudents();
        setStudents(data);
      }
    } catch (error) {
      setError(error.message || "Failed to search students.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      setStudents(students.filter((student) => student._id !== id)); // Update UI
    } catch (error) {
      setError(error.message || "Failed to delete student.");
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Register Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => navigate("/api/students/register")}
      >
        Register now
      </button>

      <input
        type="text"
        placeholder="Search by name..."
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={handleSearch}
      />

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Age</th>
            <th className="border border-gray-300 px-4 py-2">Course</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
            <th className="border border-gray-300 px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                {student.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {student.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {student.age}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {student.course}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(student._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to={`/api/students/${student._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
          {students.length === 0 && !error && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
