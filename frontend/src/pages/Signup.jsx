import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "General"
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("Signup Successful");
      navigate("/");
    } catch {
      alert("Signup Failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} required />
        <br />
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} required />
        <br />
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})} required />
        <br />
        <button>Signup</button>
      </form>
    </div>
  );
}

export default Signup;