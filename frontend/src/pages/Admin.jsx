import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import UsersTab from '../components/AdminPanel/UsersTab';
import QuestionsTab from '../components/AdminPanel/QuestionsTab';
import AnswersTab from '../components/AdminPanel/AnswersTab';
import TopicsTab from '../components/AdminPanel/TopicsTab';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = React.useState('users');

  if (!user?.isAdmin) return <Navigate to="/" />;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-6">
      <h1 className="text-4xl font-bold text-hispDark mb-8">Admin Dashboard</h1>
      
      <div className="flex space-x-1 mb-8 border-b">
        {['users', 'questions', 'answers', 'topics'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize ${activeTab === tab ? 'text-hispBlue border-b-2 border-hispBlue' : 'text-gray-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'users' && <UsersTab />}
      {activeTab === 'questions' && <QuestionsTab />}
      {activeTab === 'answers' && <AnswersTab />}
      {activeTab === 'topics' && <TopicsTab />}
    </div>
  );
};

export default Admin;