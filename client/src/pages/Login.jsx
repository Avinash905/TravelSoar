import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/authContext";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Login() {
  const { dispatch } = useContext(AuthContext);
  const [formDetails, setFormDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { username, password } = formDetails;
      if (!username || !password) {
        return toast.error("Input field should not be empty");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      }
      dispatch({ type: "LOGIN_START" });
      const { data } = await toast.promise(
        axios.post("/auth/login", {
          username,
          password,
        }),
        {
          pending: "Logging in...",
          success: "Logged in successfully",
          error: "Unable to login user",
          loading: "Logging user...",
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("token", data.token);
      if (data.isAdmin) {
        return navigate("/dashboard/user");
      }

      return navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      return error;
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Sign In</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="text"
            name="username"
            className="form-input"
            placeholder="Enter your username"
            value={formDetails.username}
            onChange={inputChange}
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
          />
          <button type="submit" className="btn form-btn">
            sign in
          </button>
        </form>
        <p>
          Not a user?{" "}
          <NavLink className="login-link" to={"/register"}>
            Register
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Login;
