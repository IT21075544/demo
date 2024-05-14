import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import backgroundImg from "./background2.jpg"; // Import your background image

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8089/api/v1/student";

function AddPost() {
  const [studentname, setStudentName] = useState("");
  const [studentaddress, setStudentAddress] = useState("");
  const [status, setStatus] = useState("");
  const [noofpushups, setnoofpushups] = useState("");
  const [randistance, setrandistance] = useState("");
  const [weightlifted, setweightlifted] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCostChange = (event) => {
    const regex = /^\d{1,6}(\.\d{0,2})?$/; // Regular expression for 6 digits and up to 2 decimal places
    const newValue = event.target.value;

    // Check if the input matches the regex pattern or if it's an empty string
    if (newValue === "" || regex.test(newValue)) {
      setrandistance(newValue);
    }
  };

  //
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${API_URL}/save`, {
        studentname,
        studentaddress,
        status,
        noofpushups,
        randistance,
        weightlifted,
      });
      alert("Student Added Successfully!");
      setStudentName("");
      setStudentAddress("");
      setStatus("");
      setnoofpushups("");
      setrandistance("");
      setweightlifted("");
      navigate("/");
    } catch (error) {
      setError("Error saving details");
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
            <h1 style={{ fontFamily: "Billabong",color:"White",fontSize:"50px" }}>
              <center> <b>Add Meal Plan Details</b></center>
            </h1>

            <div
              className="card p-4"
              style={{
                borderRadius: "20px",
                borderWidth: "2px",
                borderColor: "black",
                marginTop: "20px",
                width: "500px",
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Add a background color with opacity
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
                    max={new Date().toISOString().split("T")[0]} // Set max attribute to current date
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Meal Plan Time</label>
                  <select
                    className="form-control"
                    id="status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Portion Size</label>
                  <select
                    className="form-control"
                    id="status"
                    value={noofpushups}
                    onChange={(event) => setnoofpushups(event.target.value)}
                    required
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
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                  Add Meal Plan
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

export default AddPost;
