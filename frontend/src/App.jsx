import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentList from "./pages/StudentList";
import StudentDetails from "./pages/StudentDetails";
import StudentRegistration from "./pages/StudentRegistration";

import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/api/students/:id" element={<StudentDetails />} />
        <Route
          path="/api/students/register"
          element={<StudentRegistration />}
        />
      </Routes>
    </Router>
  );
}

export default App;
