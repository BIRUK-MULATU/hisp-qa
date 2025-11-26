// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="card">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg mb-4" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg mb-6" required />
          <button type="submit" className="w-full btn-primary">Login</button>
        </form>
        <p className="text-center mt-4">Don't have account? <Link to="/signup" className="text-hispBlue">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;