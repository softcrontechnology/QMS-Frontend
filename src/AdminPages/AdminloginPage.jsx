import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminloginPage.css"; // Import the CSS file
import image from "./image.jpg";

import Cookies from "js-cookie";

const AdminLoginPage = () => {
  const [obj, setObj] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };
  const isFormValid = obj.username !== "" && obj.password !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
        credentials: "include",
      });

      const result = await response.json();

      console.log(result);

      if (result.message === "Invalid username") {
        alert("Check your username");
        return;
      }

      if (result.message === "Check your password") {
        alert("Please check your password");
        return;
      }

      if (result.message === "User logged in successfully") {
        navigate("/dashboard");
        try {
          const statusResponse = await fetch(
            "http://localhost:8000/api/v1/getQueue",
            {
              method: "GET",
              credentials: "include",
            }
          );

          const statusResult = await statusResponse.json();
          console.log(statusResult);

          if (statusResult.message === "Unauthorized") {
            alert("Session expired, please log in again.");
            navigate("/admin-login");
          } else {
            console.log("Queue data:", statusResult);

            let cookieArr = document.cookie.split(";");

            console.log(cookieArr);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong, Try Again!");
    }
  };

  return (
    <div className="loginParent">
      <div className="container">
        <div className="cover">
          <div className="front">
            <img src={image} alt="backgroundimage" />
            <div className="text"></div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Admin Login</div>
              <form onSubmit={handleSubmit}>
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                      onChange={handleChange}
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      value={obj.username}
                      required
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                      onChange={handleChange}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={obj.password}
                      required
                    />
                  </div>
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
