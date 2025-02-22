import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../api/studentApi";

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: 0,
    course: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulating API call
    setTimeout(async () => {
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, 250); // Simulating delay
  }, [id]);

  return (
    <div className="max-w-lg mx-auto p-5 bg-sky-100 shadow-md rounded-lg">
      <h1 className="text-5xl font-bold mb-8">Student Details</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2 className="text-red-500">{error}</h2>
      ) : (
        // Show data when loading is done and succesfully fetch the data
        <>
          <p className="overflow-hidden text-lg">
            <strong>Name:</strong> {student.name}
          </p>
          <p className="overflow-hidden text-lg">
            <strong>Email:</strong> {student.email}
          </p>
          <p className="overflow-hidden text-lg">
            <strong>Age:</strong> {student.age}
          </p>
          <p className="overflow-hidden text-lg">
            <strong>Course:</strong> {student.course}
          </p>
        </>
      )}
    </div>
  );
}

export default StudentDetails;
