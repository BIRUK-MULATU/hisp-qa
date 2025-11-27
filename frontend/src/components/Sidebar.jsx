import React, { useEffect, useState } from 'react';
import API from '../api/api';
import {
  Plus,
  Layout,
  Smartphone,
  Database,
  Activity,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Hash,
  Folder,
  Globe,
  Server,
  Code,
  Shield,
  Users,
  FileText
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Map string icon names to components
const ICON_MAP = {
  Layout,
  Smartphone,
  Database,
  Activity,
  MoreHorizontal,
  Folder,
  Hash,
  Globe,
  Server,
  Code,
  Shield,
  Users,
  FileText
};

const Sidebar = ({ isOpen, onClose, isEmbedded = false }) => {
  const [mainTopics, setMainTopics] = useState([]);
  const [subTopicsMap, setSubTopicsMap] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const location = useLocation();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await API.get('/topics');
      const allTopics = res.data;

      // Filter Main Topics (no parent)
      const mains = allTopics.filter(t => !t.parent);

      // Group Subtopics by Parent ID
      const subs = {};
      allTopics.filter(t => t.parent).forEach(t => {
        if (!subs[t.parent]) subs[t.parent] = [];
        subs[t.parent].push(t);
      });

      setMainTopics(mains);
      setSubTopicsMap(subs);

      // Default expand all or based on logic
      const initialExpanded = {};
      mains.forEach(m => initialExpanded[m._id] = true);
      setExpandedCategories(initialExpanded);

    } catch (err) {
      console.error('Failed to fetch topics', err);
    }
  };

  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const content = (
    <>
      <div className="p-6 flex-1">
        <h2 className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-6">Topics</h2>

        <nav className="space-y-4">
          <Link
            to="/"
            className="block px-4 py-3 text-white font-semibold bg-white/20 rounded-lg mb-4 hover:bg-white/30 transition"
          >
            All Questions
          </Link>

          {mainTopics.map(main => {
            const Icon = ICON_MAP[main.icon] || Folder;
            const subs = subTopicsMap[main._id] || [];
            const isExpanded = expandedCategories[main._id];

            return (
              <div key={main._id} className="space-y-1">
                <button
                  onClick={() => toggleCategory(main._id)}
                  className="w-full flex items-center justify-between px-2 py-2 text-blue-100 hover:text-white transition group"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 opacity-80 group-hover:opacity-100" />
                    <span className="font-semibold">{main.title}</span>
                  </div>
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>

                {isExpanded && (
                  <div className="pl-10 space-y-1 border-l border-blue-400/30 ml-4">
                    {subs.length > 0 ? (
                      subs.map(sub => (
                        <Link
                          key={sub._id}
                          to={`/?main=${encodeURIComponent(main.title)}&sub=${encodeURIComponent(sub.title)}`}
                          className={`block w-full text-left px-3 py-2 rounded-md text-sm transition flex items-center justify-between group ${location.search.includes(`sub=${encodeURIComponent(sub.title)}`)
                              ? 'bg-hispActive text-white font-bold'
                              : 'text-blue-100 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                          <span className="truncate">{sub.title}</span>
                        </Link>
                      ))
                    ) : (
                      <div className="text-xs text-blue-300 italic px-3 py-1">No subtopics</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="p-6 bg-hispActive/20 backdrop-blur-sm border-t border-blue-400/20">
        <Link
          to="/create"
          className="w-full bg-hispGreen text-white py-3 rounded-md font-bold hover:bg-green-600 transition shadow-md flex items-center justify-center space-x-2 group"
        >
          <Plus className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span>Ask About Anything</span>
        </Link>
      </div>
    </>
  );

  if (isEmbedded) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={onClose}
          ></div>
        )}
        {content}
      </>
    );
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside className={`
        w-72 bg-hispBlue text-white min-h-[calc(100vh-4rem)]
        fixed top-16 left-0 z-40 shadow-xl flex flex-col overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {content}
      </aside>
    </>
  );
};

export default Sidebar;