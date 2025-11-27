import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import CreateQuestion from './pages/CreateQuestion';
import QuestionDetail from './pages/QuestionDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTopic, setActiveTopic] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-hispLight font-sans text-hispDarkText">
      {/* HEADER — fixed */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar
          onSearch={setSearchTerm}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      <div className="flex flex-1 pt-16"> {/* pt-16 to account for fixed header */}
        {/* SIDEBAR — fixed height, scrollable */}
        {!isAuthPage && (
          <aside className={`
            fixed left-0 top-16 bottom-0 w-80 bg-hispBlue overflow-y-auto z-40
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <Sidebar
              activeTopic={activeTopic}
              onTopicSelect={(topic) => {
                setActiveTopic(topic);
                setIsSidebarOpen(false);
              }}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              isEmbedded={true} // Prop to tell Sidebar it's embedded and shouldn't render its own container
            />
          </aside>
        )}

        {/* MAIN CONTENT — starts after sidebar width */}
        <main className={`flex-1 flex flex-col min-h-0 ${!isAuthPage ? 'lg:ml-80' : ''} transition-all duration-300`}>
          <div className="flex-1 p-4 sm:p-6 pb-20">
            <Routes>
              <Route
                path="/"
                element={<Home searchTerm={searchTerm} activeTopic={activeTopic} />}
              />
              <Route path="/create" element={<CreateQuestion />} />
              <Route path="/question/:id" element={<QuestionDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          {/* FOOTER — always at bottom */}
          <Footer />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;