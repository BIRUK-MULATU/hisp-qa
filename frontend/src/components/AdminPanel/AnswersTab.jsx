import React, { useEffect, useState } from 'react';
import API from '../../api/api';

const AnswersTab = () => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    API.get('/answers').then(res => setAnswers(res.data));
  }, []);

  const deleteAnswer = async (id) => {
    if (window.confirm('Delete this answer?')) {
      await API.delete(`/answers/${id}`);
      setAnswers(answers.filter(a => a._id !== id));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-2xl font-bold mb-6">All Answers</h3>
      <div className="space-y-4">
        {answers.map(a => (
          <div key={a._id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-gray-700">{a.body.substring(0, 100)}...</p>
              <p className="text-sm text-gray-600">by {a.user?.name || 'Guest'} • {new Date(a.createdAt).toLocaleDateString()}</p>
            </div>
            <button onClick={() => deleteAnswer(a._id)} className="text-red-600 hover:text-red-800 font-medium">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswersTab;