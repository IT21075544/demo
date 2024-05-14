import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import Chart, { Colors } from "chart.js/auto";

// Import your background image
import backgroundImage from "./background.jpg";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8089/api/v1/student";

function Student() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/getall`);
      setStudents(response.data);
    } catch (error) {
      setError("Error fetching details");
    }
  };

  const handleNavigateToAddStudent = () => {
    navigate("/post");
  };

  const handleEditStudent = (studentId) => {
    navigate(`/editpost/${studentId}`);
  };
//Delete student
  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`${API_URL}/delete/${studentId}`);
      alert("Successfully Deleted");
      fetchStudents(); // Refetch data after deletion
    } catch (error) {
      setError("Error deleting student details");
    }
  };


  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <center>
        <div>
          <br />
          <p style={{fontFamily:"Billabong", fontSize: "50px",color:"black"}}><b>Meal Plans</b></p>
          <br />
          <br />
          <br />
          <button
            className="btn btn-primary mt-4"
            onClick={handleNavigateToAddStudent}
          >
            Add New Meal Plan
          </button>
          <br />
          <br />
          <div>
            <div
              className="card-container mt-4"
              style={{
                justifyContent: "center",
                marginTop: "20px",
                width: "500px",
              }}
            >
              {students.map((student) => (
                <div key={student._id} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{student.studentname}</h5>
                    <p className="card-text">
                      <strong>Date:</strong> {student.studentname}
                    </p>
                    <p className="card-text">
                      <strong>Description:</strong> {student.studentaddress}
                    </p>
                    <p className="card-text">
                      <strong>Meal Plan Time:</strong> {student.status}
                    </p>
                    <p className="card-text">
                      <strong>Portion Size:</strong> {student.noofpushups}
                    </p>
                    <p className="card-text">
                      <strong>Cost:</strong> Rs. {student.randistance}
                    </p>
                    <p className="card-text">
                      <strong>Nutritional Information:</strong>{" "}
                      {student.weightlifted}
                    </p>
                    
                    <button
                      type="button"
                      className="btn btn-success mr-2"
                      onClick={() => handleEditStudent(student._id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      </center>
    </div>
  );
}

export default Student;
