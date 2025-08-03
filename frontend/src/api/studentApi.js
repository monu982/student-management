import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch all students
export const fetchStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

// Search students by name
export const searchStudents = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/search?name=${name}`);
    return response.data;
  } catch (error) {
    console.error("Error searching students:", error);
    return [];
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching student details:",
      error.response?.data?.error || error.message
    );
    throw new Error(
      error.response?.data?.error || "Failed to fetch student details."
    );
  }
};

export const deleteStudent = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(
      "Error deleting student:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || "Failed to delete student.");
  }
};

export const registerPage = async (studentData) => {
  try {
    if (!studentData || Object.keys(studentData).length === 0) {
      throw new Error("Invalid student data");
    }
    const response = await axios.post(`${API_URL}/register`, studentData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to register student"
    );
  }
};
