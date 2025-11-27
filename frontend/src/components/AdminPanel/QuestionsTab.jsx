import React, { useEffect, useState } from 'react';
import API from '../../api/api';
import { Trash2, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuestionsTab = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await API.get('/questions');
      setQuestions(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question? This action cannot be undone.')) return;
    try {
      await API.delete(`/questions/${id}`);
      setQuestions(questions.filter(q => q._id !== id));
      alert('Question deleted successfully');
    } catch (err) {
      alert('Failed to delete question');
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading questions...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {questions.map((question) => (
            <tr key={question._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-hispBlue hover:underline">
                  <Link to={`/question/${question._id}`} target="_blank" className="flex items-center gap-1">
                    {question.title}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                <div className="text-sm text-gray-500 truncate max-w-md">{question.body}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {question.topic ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {question.topic.title}
                  </span>
                ) : (
                  <span className="text-gray-400 text-xs">Uncategorized</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1 text-gray-400" />
                  {question.answers?.length || 0} answers
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleDelete(question._id)}
                  className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete Question"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsTab;