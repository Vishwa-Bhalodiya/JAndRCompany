import { API_BASE_URL } from "../../config";
import "./Register.css";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {

    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/users/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Registration Successful!");

        navigate("/login");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    }

    setLoading(false);
  };

  return (
    <section className="register">

      <div className="register-overlay"></div>

      <div className="register-container">

        {/* BRAND */}

        <motion.div
          className="register-brand"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>J & R <span>COMPANY</span></h1>
          <p>Join Trusted Land Investment Platform</p>
        </motion.div>

        {/* REGISTER CARD */}

        <motion.div
          className="register-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >

          <h2>Create Account</h2>

          {/* NAME */}

          <div className="register-input-box">
            <FaUser />

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>

          {/* EMAIL */}

          <div className="register-input-box">
            <FaEnvelope />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          {/* MOBILE */}

          <div className="register-input-box">
            <FaPhone />

            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile"
            />
          </div>

          {/* PASSWORD */}

          <div className="register-input-box">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="register-input-box">

            <FaLock />

            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />

            <span onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          {/* BUTTON */}

          <button
            className="register-btn"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* LOGIN */}

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </motion.div>

      </div>

    </section>
  );
}

export default Register;