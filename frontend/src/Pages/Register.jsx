import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  sendEmailOTP,
  verifyOTP,
  registerUser,
} from "../services/authService";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // STEP 1 → SEND OTP
  const handleSendOTP = async () => {
    try {
      setLoading(true);
      await sendEmailOTP({ email: form.email });
      alert("OTP sent to email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.msg || "Error sending OTP");
    }
    setLoading(false);
  };

  // STEP 2 → VERIFY OTP
  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      await verifyOTP({ email: form.email, otp });
      alert("Email verified");
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid OTP");
    }
    setLoading(false);
  };

  // STEP 3 → REGISTER
  const handleRegister = async () => {
    try {
      setLoading(true);
      await registerUser(form);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="blur-bg">
      <div className="register-container">
        <h2>Register</h2>

        {step === 1 && (
          <>
            <input name="firstName" placeholder="First Name" onChange={handleChange} />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} />
            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="phone" placeholder="Phone" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />

            <button onClick={handleSendOTP}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button onClick={handleVerifyOTP}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {step === 3 && (
          <button onClick={handleRegister}>
            {loading ? "Creating..." : "Complete Registration"}
          </button>
        )}

        <p onClick={() => navigate("/")} className="link">
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;