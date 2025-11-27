// src/pages/Home.jsx — FINAL 100% WORKING
import React, { useEffect, useState } from 'react';
import API from '../api/api';
import QuestionCard from '../components/QuestionCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/questions')  // ← This route exists
      .then(res => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Questions failed:', err.response?.data || err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Loading questions...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-hispDark">Recent Questions</h2>
        <Link to="/create" className="bg-hispOrange text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600">
          Ask Question
        </Link>
      </div>

      {questions.length === 0 ? (
        <p className="text-center text-gray-500 py-20 text-xl">
          No questions yet. Be the first to ask!
        </p>
      ) : (
        <div className="space-y-6">
          {questions.map(q => (
            <QuestionCard key={q._id} question={q} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;