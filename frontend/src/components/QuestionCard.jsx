import React from 'react';
import { Clock, CornerDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { title: 'Web App Development', keywords: ['react', 'web', 'javascript', 'css', 'html', 'frontend', 'node', 'api', 'ui', 'ux'] },
  { title: 'Android App Development', keywords: ['android', 'mobile', 'kotlin', 'java', 'app', 'offline', 'sync', 'apk'] },
  { title: 'Data & Analytics', keywords: ['data', 'sql', 'analytics', 'report', 'dashboard', 'visualization', 'visualizer', 'chart', 'map'] },
  { title: 'Health Information Systems', keywords: ['dhis2', 'health', 'his', 'tracker', 'aggregate', 'program', 'dataset'] }
];

const getCategory = (topicTitle) => {
  if (!topicTitle) return 'General';
  const lower = topicTitle.toLowerCase();
  for (const cat of CATEGORIES) {
    if (cat.keywords.some(k => lower.includes(k))) return cat.title;
  }
  return 'Others';
};

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return "Just now";
};

const QuestionCard = ({ question }) => {
  const answerCount = question.answers?.length || 0;
  const category = getCategory(question.topic?.title);

  return (
    <Link to={`/question/${question._id}`} className="block group">
      <div className="bg-white p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 first:rounded-t-md last:rounded-b-md last:border-b-0">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-lg font-bold text-hispBlue group-hover:text-hispActive transition-colors mb-1 line-clamp-1">
              {question.title}
            </h3>

            {/* Body Preview */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
              {question.body}
            </p>

            {/* Tags & Meta */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                {category}
              </span>
              {question.topic && (
                <span className="bg-blue-50 text-hispBlue px-2.5 py-1 rounded-full font-medium flex items-center">
                  <CornerDownRight className="h-3 w-3 mr-1" />
                  {question.topic.title}
                </span>
              )}
              <span className="text-gray-400 flex items-center ml-1">
                <Clock className="h-3 w-3 mr-1" />
                {timeAgo(question.createdAt)}
              </span>
            </div>
          </div>

          {/* Right Side: Answer Badge */}
          <div className="flex-shrink-0 text-right">
            <div className={`flex flex-col items-center justify-center min-w-[60px] px-2 py-1.5 rounded-md border ${answerCount > 0
              ? 'bg-green-50 border-green-200 text-hispGreen'
              : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}>
              <span className="text-lg font-bold leading-none">{answerCount}</span>
              <span className="text-[10px] uppercase font-medium mt-0.5">Ans</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;