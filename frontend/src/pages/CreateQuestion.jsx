import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", body: "", tags: "", category: "General" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = { ...form, tags: form.tags.split(",") };
      await API.post("/questions", data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-hispGray">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-hispBlue">Ask Question</h2>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full p-2 mb-4 border rounded"/>
        <textarea name="body" placeholder="Body" value={form.body} onChange={handleChange} className="w-full p-2 mb-4 border rounded"/>
        <input type="text" name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} className="w-full p-2 mb-4 border rounded"/>
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full p-2 mb-4 border rounded"/>
        <button type="submit" className="bg-hispBlue w-full p-2 text-white rounded">Submit</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
