import { API_BASE_URL } from "../../config";
import "./Login.css";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { setAuth } from "../../services/auth";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed");
      setLoading(false);
      return;
    }

    // 🔐 STORE TOKENS (IMPORTANT FIX)
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    // 👤 STORE USER INFO
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("email", data.user.email);

    // OPTIONAL: keep your auth helper if needed
    if (setAuth) {
      setAuth(data.access, data.user);
    }

    // 🚀 ROLE-BASED REDIRECT (FIXED)
    if (data.user.role === "admin") {
      navigate("/Dashboard");
    } else {
      navigate("/");
    }

  } catch (error) {
    console.error(error);
    alert("Server connection failed.");
  }

  setLoading(false);
};

  return (
    <section className="login">

      <div className="login-bg"></div>
      <div className="login-overlay"></div>

      <div className="login-container">

        {/* BRAND */}
        <motion.div
          className="login-brand"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>J & R <span>COMPANY</span></h1>
          <p>Premium Land & Investment Properties</p>
        </motion.div>

        {/* LOGIN CARD */}
        <motion.div
          className="login-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >

          {/* 💛 GOLD TEXT CLASSES ADDED */}
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Login to continue</p>

          {/* EMAIL */}
          <div className="login-input-box">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
            />
          </div>

          {/* PASSWORD */}
          <div className="login-input-box">
            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
            />

            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* OPTIONS */}
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>

            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* LOGIN BUTTON */}
          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* DIVIDER */}
          <div className="divider">OR</div>

          {/* GOOGLE LOGIN */}
          <button className="google-btn">
            <FaGoogle /> Continue with Google
          </button>

          {/* REGISTER LINK */}
          <p className="register-link">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>

        </motion.div>

      </div>

    </section>
  );
}

export default Login;