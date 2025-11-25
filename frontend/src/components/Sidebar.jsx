import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    API.get("/topics")
      .then(res => setTopics(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <aside className="bg-gray-100 p-4 w-64">
      <h2 className="font-bold mb-4">Topics</h2>
      <ul>
        {topics.map(t => (
          <li key={t._id} className="mb-2">
            <Link to={`/create-question?topic=${t._id}`} className="hover:underline">{t.name}</Link>
          </li>
        ))}
      </ul>
      <hr className="my-4"/>
      <Link to="/create-question" className="font-bold text-blue-600 hover:underline">Ask About Anything</Link>
    </aside>
  );
};

export default Sidebar;
