import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const CreateQuestion = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [topic, setTopic] = useState('');
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/topics').then(res => setTopics(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/questions', { title, body, topic: topic || null });
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="card">
        <h2 className="text-3xl font-bold text-hispDark mb-6">Ask a Question</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Question Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:border-hispBlue"
            required
          />
          <textarea
            placeholder="Describe your question..."
            value={body}
            onChange={e => setBody(e.target.value)}
            rows="6"
            className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:border-hispBlue"
            required
          />
          <select
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg mb-6"
          >
            <option value="">General / No Topic</option>
            {topics.map(t => (
              <option key={t._id} value={t._id}>{t.title}</option>
            ))}
          </select>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {user ? `Posting as ${user.name}` : 'Posting as Guest'}
            </p>
            <button type="submit" className="btn-primary">
              Post Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;