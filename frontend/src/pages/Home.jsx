// src/pages/Home.jsx — FINAL 100% WORKING
import React, { useEffect, useState } from 'react';
import API from '../api/api';
import QuestionCard from '../components/QuestionCard';
import { Link, useSearchParams } from 'react-router-dom';
import { MessageSquarePlus, SearchX } from 'lucide-react';

const Home = ({ searchTerm }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const mainParam = searchParams.get('main');
  const subParam = searchParams.get('sub');

  useEffect(() => {
    API.get('/questions')
      .then(res => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Questions failed:', err.response?.data || err.message);
        setLoading(false);
      });
  }, []);

  const filteredQuestions = questions.filter(q => {
    const matchesSubtopic = subParam ? q.topic?.title === subParam : true;

    const matchesSearch = searchTerm
      ? q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.body.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesSubtopic && matchesSearch;
  });

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hispBlue"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-hispBlue tracking-tight">
            {subParam ? subParam : 'Recent Questions'}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {subParam
              ? `Browse ${filteredQuestions.length} questions in ${subParam}`
              : `Browse ${filteredQuestions.length} questions across all topics`}
          </p>
        </div>

        {/* Sort/Filter Controls (Visual only for now) */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600">Sort by:</span>
          <select className="bg-white border border-gray-300 text-hispDarkText rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-hispBlue focus:border-hispBlue cursor-pointer">
            <option>Newest</option>
            <option>Most Answers</option>
            <option>Unanswered</option>
          </select>
        </div>
      </div>

      {/* Content Area */}
      {filteredQuestions.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-md border border-dashed border-gray-300">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            {searchTerm ? <SearchX className="h-8 w-8 text-hispBlue" /> : <MessageSquarePlus className="h-8 w-8 text-hispBlue" />}
          </div>
          <h3 className="text-lg font-bold text-hispBlue mb-2">
            {searchTerm ? `No results for "${searchTerm}"` : 'No questions yet'}
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
            {searchTerm
              ? "Try adjusting your search terms or browse all topics."
              : "Be the first to ask a question in this category and help others!"}
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-hispGreen text-white px-5 py-2.5 rounded-md font-semibold hover:bg-green-600 transition shadow-sm"
          >
            <MessageSquarePlus className="h-5 w-5" />
            <span>Ask a Question</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          {filteredQuestions.map(q => (
            <QuestionCard key={q._id} question={q} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;