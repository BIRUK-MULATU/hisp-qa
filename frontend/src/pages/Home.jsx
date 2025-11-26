import React, { useEffect, useState } from 'react';
import API from '../api/api';
import QuestionCard from '../components/QuestionCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    API.get('/questions').then(res => setQuestions(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-hispDark">Recent Questions</h2>
        <Link to="/create" className="btn-primary">Ask Question</Link>
      </div>
      <div className="space-y-6">
        {questions.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No questions yet. Be the first to ask!</p>
        ) : (
          questions.map(q => <QuestionCard key={q._id} question={q} />)
        )}
      </div>
    </div>
  );
};

export default Home;