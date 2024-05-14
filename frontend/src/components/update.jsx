import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddPost from "./add";
import backgroundImg from "./background3.jpg"; // Import your background image

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8089/api/v1/student";

  // UpdatePost component
function UpdatePost() {
  const [studentname, setStudentName] = useState("");
  const [studentaddress, setStudentAddress] = useState("");
  const [status, setStatus] = useState("");
  const [noofpushups, setnoofpushups] = useState("");
  const [randistance, setrandistance] = useState("");
  const [weightlifted, setweightlifted] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${API_URL}/search/${studentId}`);
        setStudentName(response.data.studentname);
        setStudentAddress(response.data.studentaddress);
        setStatus(response.data.status);
        setnoofpushups(response.data.noofpushups);
        setrandistance(response.data.randistance);
        setweightlifted(response.data.weightlifted);
      } catch (error) {
        setError("Error fetching details");
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleCostChange = (event) => {
    const regex = /^\d{1,6}(\.\d{0,2})?$/; // Regular expression for 6 digits and up to 2 decimal places
    const newValue = event.target.value;

    // Check if the input matches the regex pattern or if it's an empty string
    if (newValue === "" || regex.test(newValue)) {
      setrandistance(newValue);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`${API_URL}/edit/${studentId}`, {
        studentname,
        studentaddress,
        status,
        noofpushups,
        randistance,
        weightlifted,
      });
      alert("Successfully Updated!");
      navigate("/");
    } catch (error) {
      setError("Error updating details");
    }
  };

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${backgroundImg})`, // Set background image
        backgroundSize: "cover", // Cover entire container
        backgroundPosition: "center", // Center the background image
        minHeight: "100vh", // Set minimum height to cover entire viewport
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <br />
            <br />
            <h1 style={{ fontFamily: "Billabong",color:"black",fontSize:"50px", textAlign: "center" }}>
              <b>Update Meal Plan Details</b>
            </h1>
            <div
              className="card p-4"
              style={{
                justifyContent: "center",
                alignItems: "left -50px",
                borderRadius: "20px",
                borderWidth: "2px",
                borderColor: "black",
                marginTop: "20px",
                width: "500px",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="studentname">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="studentname"
                    value={studentname}
                    onChange={(event) => setStudentName(event.target.value)}
                    max={new Date().toISOString().split('T')[0]} // Set max attribute to current date
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="studentaddress">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentaddress"
                    value={studentaddress}
                    onChange={(event) => setStudentAddress(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Meal Plan Time</label>
                  <select
                    className="form-control"
                    id="status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="noofpushups">Portion Size</label>
                  <select
                    className="form-control"
                    id="noofpushups"
                    value={noofpushups}
                    onChange={(event) => setnoofpushups(event.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="Full">Full</option>
                    <option value="Half">Half</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="randistance">Cost (LKR)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="randistance"
                    value={randistance}
                    onChange={handleCostChange}
                    placeholder="Enter cost (max 6 digits, 2 decimal places)"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="weightlifted">Nutritional Information</label>
                  <input
                    type="text"
                    className="form-control"
                    id="weightlifted"
                    value={weightlifted}
                    onChange={(event) => setweightlifted(event.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                  Update
                </button>
              </form>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;
