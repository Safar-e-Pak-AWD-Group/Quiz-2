import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  sanitizeInput,
  validateEmail,
  validatePassword,
} from "../../utils/validation.js";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Redirect if user/admin already logged in
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    if (userToken) {
      setTimeout(() => navigate("/home", { replace: true }), 0);
    } else if (adminToken) {
      setTimeout(() => navigate("/adminpanel", { replace: true }), 0);
    }
  }, [navigate]);

  // Handle change with live validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = sanitizeInput(value);

    setFormData({ ...formData, [name]: cleanValue });

    let newErrors = { ...errors };
    if (name === "email") newErrors.email = validateEmail(cleanValue);
    if (name === "password") newErrors.password = validatePassword(cleanValue);
    setErrors(newErrors);
  };

  // Handle form submission for both user & admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setMessage("Please fix the errors before continuing.");
      return;
    }

    try {
      const isAdmin = formData.email === "hhlgroup@gmail.com";
      const url = isAdmin
        ? "http://localhost:5000/api/admin/login"
        : "http://localhost:5000/api/users/login";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isAdmin) {
          // Admin login
          localStorage.setItem("adminToken", data.token);
          alert("Admin login successful!");
          navigate("/adminpanel", { replace: true });
        } else {
          // User login
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Login successful!");
          navigate("/home", { replace: true });
        }
      } else {
        setMessage(data.message || "Invalid email or password!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Login to continue your journey</p>

        {message && <p className="login-message">{message}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "invalid" : "valid"}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "invalid" : "valid"}
              required
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
