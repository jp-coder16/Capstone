import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const sendEmailOTP = (data) =>
  axios.post(`${API}/send-otp`, data);

export const verifyOTP = (data) =>
  axios.post(`${API}/verify-otp`, data);

export const registerUser = (data) =>
  axios.post(`${API}/register`, data);

export const loginUser = (data) =>
  axios.post(`${API}/login`, data);