import { useEffect, useState } from "react";
import API from "../api/api";
import QuestionCard from "../components/QuestionCard";

const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    API.get("/questions")
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-hispBlue mb-6">All Questions</h1>
      {questions.map(q => <QuestionCard key={q._id} question={q} />)}
    </div>
  );
};

export default Home;
