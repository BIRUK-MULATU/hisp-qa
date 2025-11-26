import React from 'react';
import { User, Calendar } from 'lucide-react';

const AnswerCard = ({ answer }) => {
  return (
    <div className="border-l-4 border-hispGreen pl-6 py-4">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-hispBlue rounded-full flex items-center justify-center text-white font-bold">
          {answer.user?.name?.[0] || 'G'}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="font-semibold text-hispDark">
              {answer.user?.name || 'Guest'}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(answer.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed">{answer.body}</p>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;