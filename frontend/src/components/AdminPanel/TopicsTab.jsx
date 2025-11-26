import React, { useEffect, useState } from 'react';
import API from '../../api/api';

const TopicsTab = () => {
  const [topics, setTopics] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    API.get('/topics').then(res => setTopics(res.data));
  }, []);

  const createTopic = async () => {
    if (!newTitle.trim()) return;
    const res = await API.post('/topics', { title: newTitle, description: '' });
    setTopics([...topics, res.data]);
    setNewTitle('');
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-2xl font-bold mb-6">Manage Topics</h3>
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="New topic name"
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button onClick={createTopic} className="btn-green">Add Topic</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {topics.map(t => (
          <div key={t._id} className="bg-hispGreen text-white p-4 rounded-lg text-center font-medium">
            {t.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsTab;