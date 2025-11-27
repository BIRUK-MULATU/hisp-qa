import React, { useEffect, useState } from 'react';
import API from '../../api/api';

const QuestionsTab = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
  API.get('/questions').then(res => setQuestions(res.data));
  }, []);

  const deleteQuestion = async (id) => {
    if (window.confirm('Delete this question?')) {
      await API.delete(`/questions/${id}`);
      setQuestions(questions.filter(q => q._id !== id));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-2xl font-bold mb-6">All Questions</h3>
      <div className="space-y-4">
        {questions.map(q => (
          <div key={q._id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{q.title}</h4>
              <p className="text-sm text-gray-600">by {q.user?.name || 'Guest'} • {new Date(q.createdAt).toLocaleDateString()}</p>
            </div>
            <button onClick={() => deleteQuestion(q._id)} className="text-red-600 hover:text-red-800 font-medium">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsTab;