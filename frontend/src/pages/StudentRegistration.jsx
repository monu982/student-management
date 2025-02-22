import { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerPage } from "../api/studentApi"; // Ensure this sends a POST request
import { useNavigate } from "react-router-dom";

// **Yup Validation Schema**
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name is too short.")
    .max(25, "Name is too long.")
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .required("Name is required."),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(10, "You are too youger.")
    .max(100, "You are too older.")
    .required("Age is required"),
  course: Yup.string().required("Course is required"),
});

export default function StudentRegistration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = useCallback(
    async (values, resetForm) => {
      try {
        const response = await registerPage(values); // Ensure registerStudent makes a POST request
        setSuccess("Student registered successfully!");

        setTimeout(() => {
          resetForm(); // Reset the form after submission
          navigate("/");
        }, 500); // 0.5s delay ensures smooth transition
      } catch (err) {
        console.log(err.message);
        setError(err.message || "Registration failed. Please try again.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    },
    [navigate]
  );

  // **Formik Hook**
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      course: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setError("");
      setSuccess("");
      handleSubmit(values, resetForm);
    },
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-sky-200 shadow-lg rounded-2xl">
      <h2 className="text-4xl font-bold mb-4">Student Registration</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      {/* Form Start */}
      <form
        className="space-y-4 bg-white p-6 rounded shadow"
        onSubmit={formik.handleSubmit}
      >
        {/* Name Field */}
        <div className="flex items-center">
          <label htmlFor="name" className="w-24 font-semibold text-left mr-1">
            Name:
          </label>
          <div className="flex-1">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="border p-2 w-full rounded"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-600 text-sm text-left">
                *{formik.errors.name}
              </p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="flex items-center">
          <label htmlFor="email" className="w-24 font-semibold text-left mr-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="border p-2 w-full rounded"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-600 text-sm">{formik.errors.email}</p>
          )}
        </div>

        {/* Age Field */}
        <div className="flex items-center">
          <label htmlFor="age" className="w-24 font-semibold text-left mr-1">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Enter your age"
            className="border p-2 w-full rounded"
            value={formik.values.age}
            onChange={formik.handleChange}
          />
          {formik.touched.age && formik.errors.age && (
            <p className="text-red-600 text-sm">{formik.errors.age}</p>
          )}
        </div>

        {/* Course Field */}
        <div className="flex items-center">
          <label htmlFor="course" className="w-24 font-semibold text-left mr-1">
            Course:
          </label>
          <input
            type="text"
            id="course"
            name="course"
            placeholder="Enter your course"
            className="border p-2 w-full rounded"
            value={formik.values.course}
            onChange={formik.handleChange}
          />
          {formik.touched.course && formik.errors.course && (
            <p className="text-red-600 text-sm">{formik.errors.course}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {/* Form End */}
    </div>
  );
}
