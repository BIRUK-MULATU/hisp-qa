import React from 'react';
import { MessageSquare, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuestionCard = ({ question }) => {
  const answerCount = question.answers?.length || 0;

  return (
    <Link to={`/question/${question._id}`} className="block">
      <div className="card hover:border-hispBlue cursor-pointer">
        <h3 className="text-xl font-bold text-hispDark mb-3">{question.title}</h3>
        <p className="text-gray-700 mb-4 line-clamp-2">{question.body}</p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-500">
            {question.topic && (
              <span className="bg-hispGreen text-white px-3 py-1 rounded-full text-xs font-medium">
                {question.topic.title}
              </span>
            )}
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {new Date(question.createdAt).toLocaleDateString('en-GB')}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {question.user ? (
              <span className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-1" />
                {question.user.name}
              </span>
            ) : (
              <span className="text-gray-400 italic">Guest</span>
            )}
            <span className="flex items-center text-hispOrange font-medium">
              <MessageSquare className="h-5 w-5 mr-1" />
              {answerCount} {answerCount === 1 ? 'Answer' : 'Answers'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;