import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-hispGray">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-hispBlue">Signup</h2>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 mb-4 border rounded"/>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 mb-4 border rounded"/>
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 mb-4 border rounded"/>
        <button type="submit" className="bg-hispBlue w-full p-2 text-white rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
