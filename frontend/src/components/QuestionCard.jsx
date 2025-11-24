import { Link } from "react-router-dom";

const QuestionCard = ({ question }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <Link to={`/questions/${question._id}`}>
        <h3 className="font-bold text-hispBlue text-xl">{question.title}</h3>
      </Link>
      <p className="text-gray-700">{question.body}</p>
      <div className="text-sm text-gray-500 mt-2">
        Votes: {question.votes} | Category: {question.category}
      </div>
    </div>
  );
};

export default QuestionCard;
