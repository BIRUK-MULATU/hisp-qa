import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';
import AnswerCard from '../components/AnswerCard';

const QuestionDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    API.get(`/questions/${id}`).then(res => setQuestion(res.data));
  }, [id]);

  const postAnswer = async () => {
    if (!user) return alert('You must be logged in to answer');
    const res = await API.post(`/answers/${id}`, { body: answer });
    setQuestion({ ...question, answers: [...question.answers, res.data] });
    setAnswer('');
  };

  if (!question) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="card mb-8">
        <h1 className="text-3xl font-bold text-hispDark mb-4">{question.title}</h1>
        <p className="text-gray-700 mb-6">{question.body}</p>
        {question.topic && <span className="bg-hispGreen text-white px-4 py-2 rounded-full text-sm">{question.topic.title}</span>}
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6">{question.answers?.length || 0} Answers</h3>
        {question.answers?.map(ans => <AnswerCard key={ans._id} answer={ans} />)}
      </div>

      {user && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Your Answer</h3>
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder="Write your answer..."
            rows="5"
            className="w-full px-4 py-3 border rounded-lg mb-4"
          />
          <button onClick={postAnswer} className="btn-primary">Post Answer</button>
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;