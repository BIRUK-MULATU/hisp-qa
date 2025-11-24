const AnswerCard = ({ answer }) => {
  return (
    <div className="bg-gray-100 p-3 rounded mb-2">
      <p>{answer.body}</p>
      <div className="text-sm text-gray-500 mt-1">Votes: {answer.votes}</div>
    </div>
  );
};

export default AnswerCard;
