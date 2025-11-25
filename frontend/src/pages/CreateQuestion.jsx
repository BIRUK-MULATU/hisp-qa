import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate, useSearchParams } from "react-router-dom";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState({ title: "", body: "", topic: "" });

  useEffect(() => {
    API.get("/topics").then(res => setTopics(res.data));
  }, []);

  useEffect(() => {
    const topicId = searchParams.get("topic");
    if (topicId) setForm(prev => ({ ...prev, topic: topicId }));
  }, [searchParams]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/questions", form);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-hispBlue">Ask Question</h2>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full p-2 mb-4 border rounded"/>
        <textarea name="body" placeholder="Body" value={form.body} onChange={handleChange} className="w-full p-2 mb-4 border rounded"/>
        <select name="topic" value={form.topic} onChange={handleChange} className="w-full p-2 mb-4 border rounded">
          <option value="">Select Topic</option>
          {topics.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
        </select>
        <button type="submit" className="bg-hispBlue w-full p-2 text-white rounded">Submit</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
