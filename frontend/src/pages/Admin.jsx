import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import UsersTab from '../components/AdminPanel/UsersTab';
import QuestionsTab from '../components/AdminPanel/QuestionsTab';
import AnswersTab from '../components/AdminPanel/AnswersTab';
import TopicsTab from '../components/AdminPanel/TopicsTab';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('users');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-hispDark">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage users, questions, and system content.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['users', 'questions', 'answers', 'topics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    group inline-flex items-center px-6 py-4 border-b-2 font-medium text-sm capitalize transition-colors
                    ${activeTab === tab
                      ? 'border-hispBlue text-hispBlue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'users' && <UsersTab />}
            {activeTab === 'questions' && <QuestionsTab />}
            {activeTab === 'answers' && <AnswersTab />}
            {activeTab === 'topics' && <TopicsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;