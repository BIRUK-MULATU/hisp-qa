import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';
import AnswerCard from '../components/AnswerCard';

const QuestionDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerBody, setAnswerBody] = useState('');
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  useEffect(() => {
    API.get(`/questions/${id}`).then(res => {
      setQuestion(res.data.question);
      setAnswers(res.data.answers);
    });
  }, [id]);

  const handleAnswerClick = () => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    setShowAnswerForm(true);
  };

  const postAnswer = async () => {
    if (!user) return alert('You must be logged in to answer');
    if (!answerBody.trim()) return alert('Answer cannot be empty');

    try {
      const res = await API.post(`/answers/${id}`, { body: answerBody });
      setAnswers([res.data, ...answers]); // Add new answer to top
      setAnswerBody('');
      setShowAnswerForm(false);
    } catch (err) {
      alert('Failed to post answer');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!question) return <div className="text-center mt-20 text-gray-500">Loading question...</div>;

  const mainCategory = question.topic?.parent?.title || question.topic?.title || 'General';
  const subCategory = question.topic?.parent ? question.topic.title : '';

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      {/* FULL QUESTION CARD — ALWAYS AT THE TOP */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-[#005B7F] mb-4">{question.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 flex-wrap">
          <span className="font-medium text-gray-800">Asked by {question.user?.name || "Anonymous"}</span>
          <span>•</span>
          <span>{formatDate(question.createdAt)}</span>
          <span>•</span>
          <span className="text-[#00A65A] font-medium bg-green-50 px-2 py-1 rounded">
            {mainCategory} {subCategory && `→ ${subCategory}`}
          </span>
        </div>

        <div className="prose max-w-none text-lg text-gray-800 whitespace-pre-wrap leading-relaxed">
          {question.body}
        </div>
      </div>

      {/* ANSWER SECTION — BELOW QUESTION */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#005B7F]">
            {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
          </h2>

          {/* ANSWER BUTTON — ONLY IF LOGGED IN */}
          {!showAnswerForm && (
            <button
              onClick={handleAnswerClick}
              className="bg-[#00A65A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-md transform hover:scale-105"
            >
              {user ? 'Answer this Question' : 'Log in to Answer'}
            </button>
          )}
        </div>

        {/* Answer Form */}
        {showAnswerForm && (
          <div className="mb-10 bg-gray-50 p-6 rounded-xl border border-gray-200 animate-fade-in">
            <h3 className="text-lg font-bold mb-4 text-gray-700">Your Answer</h3>
            <textarea
              value={answerBody}
              onChange={e => setAnswerBody(e.target.value)}
              placeholder="Write your detailed answer here..."
              rows="6"
              className="w-full px-4 py-3 border rounded-lg mb-4 focus:ring-2 focus:ring-[#005B7F] focus:border-transparent outline-none bg-white"
            />
            <div className="flex space-x-4">
              <button
                onClick={postAnswer}
                className="bg-[#005B7F] text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition"
              >
                Post Answer
              </button>
              <button
                onClick={() => setShowAnswerForm(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium hover:bg-gray-200 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* List of Answers */}
        <div className="space-y-6">
          {answers.length > 0 ? (
            answers.map(ans => <AnswerCard key={ans._id} answer={ans} />)
          ) : (
            <div className="text-center py-10 text-gray-400 italic">
              No answers yet. Be the first to help!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;