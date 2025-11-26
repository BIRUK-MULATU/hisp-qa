// src/pages/Signup.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate('/');
    } catch (err) {
      alert('Signup failed. Try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="card">
        <h2 className="text-3xl font-bold text-center mb-8 text-hispDark">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:border-hispBlue"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:border-hispBlue"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg mb-6 focus:outline-none focus:border-hispBlue"
            required
          />
          <button type="submit" className="w-full btn-primary">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-hispBlue font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;