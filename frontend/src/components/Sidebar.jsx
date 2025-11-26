import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Plus } from 'lucide-react';

const Sidebar = ({ onTopicSelect, onAskClick }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    API.get('/topics')
      .then(res => setTopics(res.data))
      .catch(() => {});
  }, []);

  return (
    <aside className="w-64 bg-hispBlue text-white min-h-screen fixed top-16 left-0 hidden lg:block overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Topics</h2>
        <nav className="space-y-1">
          <button
            onClick={() => onTopicSelect(null)}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-hispGreen transition font-medium"
          >
            All Questions
          </button>
          {topics.map(topic => (
            <button
              key={topic._id}
              onClick={() => onTopicSelect(topic)}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-hispGreen transition"
            >
              {topic.title}
            </button>
          ))}
        </nav>

        <button
          onClick={onAskClick}
          className="mt-10 w-full bg-hispGreen py-4 rounded-lg font-bold hover:bg-green-600 transition flex items-center justify-center space-x-2"
        >
          <Plus className="h-6 w-6" />
          <span>Ask About Anything</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;