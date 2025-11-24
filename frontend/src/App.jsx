import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
//import Sidebar from './components/Sidebar';
//import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateQuestion from "./pages/CreateQuestion";
import QuestionDetail from "./pages/QuestionDetail";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-question" element={<CreateQuestion />} />
          <Route path="/questions/:id" element={<QuestionDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
