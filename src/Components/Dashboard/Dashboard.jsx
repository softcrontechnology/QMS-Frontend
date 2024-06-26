import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const Dashboard = () => {
  const navigate = useNavigate();

  // // Function to get a specific cookie by name
  // function getCookie(name) {
  //   const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  //   return cookieValue ? cookieValue.pop() : '';
  // }

  // // Example of fetching the 'token' cookie
  // const token = getCookie('token');

  // // Now you can use the 'token' variable where needed, for example:
  // console.log('Token:', token);

  // const isAuthenticated = Cookies.get("token") !== null; // Or use sessionStorage if that's your preference

  // console.log(isAuthenticated);
  // if (!isAuthenticated) {
  //   navigate("/login");
  //   return null;
  // }
  return <h1 className="text-center mt-5">Welcome To DashBoard</h1>;
};

export default Dashboard;
