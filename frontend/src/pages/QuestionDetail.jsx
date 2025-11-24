import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import AnswerCard from "../components/AnswerCard";
import { AuthContext } from "../context/AuthContext";

const QuestionDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [questionData, setQuestionData] = useState({ question: {}, answers: [] });
  const [answerBody, setAnswerBody] = useState("");

  useEffect(() => {
    API.get(`/questions/${id}`)
      .then(res => setQuestionData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAnswerSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post(`/answers/${id}`, { body: answerBody });
      setQuestionData({ ...questionData, answers: [...questionData.answers, res.data] });
      setAnswerBody("");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-hispBlue">{questionData.question.title}</h1>
      <p className="mb-4">{questionData.question.body}</p>

      <h2 className="text-2xl font-semibold mb-2 text-hispBlue">Answers</h2>
      {questionData.answers.map(ans => <AnswerCard key={ans._id} answer={ans} />)}

      {user && (
        <form onSubmit={handleAnswerSubmit} className="mt-4">
          <textarea
            value={answerBody}
            onChange={(e) => setAnswerBody(e.target.value)}
            placeholder="Write your answer..."
            className="w-full p-2 border rounded mb-2"
          />
          <button type="submit" className="bg-hispBlue text-white p-2 rounded">Submit Answer</button>
        </form>
      )}
    </div>
  );
};

export default QuestionDetail;
