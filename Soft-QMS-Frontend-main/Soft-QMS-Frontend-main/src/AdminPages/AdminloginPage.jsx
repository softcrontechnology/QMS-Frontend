import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminloginPage.css'; // Import the CSS file


const AdminLoginPage = () => {
    const [obj, setObj] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setObj({ ...obj, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/v1/admin-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj),
                credentials: 'include' // Include credentials (cookies)
            });

            const result = await response.json();

            if (result.message === "Invalid username") {
                alert("Check your username");
                return;
            }

            if (result.message === "Check your password") {
                alert("Please check your password");
                return;
            }

            if (result.message === "User logged in successfully") {

                navigate("/dashboard")
                // Make the authorized request using the cookies
                try {
                    const statusResponse = await fetch("http://localhost:8000/api/v1/getQueue", {
                        method: 'GET',
                        credentials: "include" // Include credentials (cookies)
                    });

                    const statusResult = await statusResponse.json();
                    console.log(statusResult);

                    if (statusResult.message === "Unauthorized") {
                        alert("Session expired, please log in again.");
                        navigate('/admin-login');
                    } else {
                        // Handle successful response
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
        <div className='body'>
            <h1>Queue Management System</h1>
            <div className="login-container">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        id='username'
                        name='username'
                        type="text"
                        placeholder="Username"
                        value={obj.username}
                    />
                    <input
                        onChange={handleChange}
                        id='password'
                        name='password'
                        type="password"
                        placeholder="Password"
                        value={obj.password}
                    />
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
