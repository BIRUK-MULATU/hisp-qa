import React, { useEffect, useState } from 'react';
import API from '../../api/api';
import { Trash2, MessageCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnswersTab = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnswers = async () => {
    try {
      setLoading(true);
      const res = await API.get('/answers');
      setAnswers(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load answers. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this answer? This action cannot be undone.')) return;
    try {
      await API.delete(`/answers/${id}`);
      setAnswers(answers.filter(a => a._id !== id));
      alert('Answer deleted successfully');
    } catch (err) {
      alert('Failed to delete answer');
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading answers...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {answers.map((answer) => (
            <tr key={answer._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-md truncate">{answer.body}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(answer.createdAt).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4">
                {answer.question ? (
                  <Link
                    to={`/question/${answer.question._id}`}
                    target="_blank"
                    className="text-sm font-medium text-hispBlue hover:underline flex items-center gap-1"
                  >
                    {answer.question.title}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                ) : (
                  <span className="text-gray-400 text-xs italic">Deleted Question</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 mr-2">
                    {answer.user?.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div className="text-sm text-gray-900">{answer.user?.name || 'Unknown'}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleDelete(answer._id)}
                  className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete Answer"
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

export default AnswersTab;