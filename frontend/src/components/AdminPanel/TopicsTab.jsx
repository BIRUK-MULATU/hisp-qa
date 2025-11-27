import React, { useEffect, useState } from 'react';
import API from '../../api/api';
import { Trash2, Edit2, Plus, Folder, Hash, ChevronRight, Layout, Smartphone, Database, Activity, MoreHorizontal, Globe, Server, Code, Shield, Users, FileText } from 'lucide-react';

// Simple icon picker map
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

const TopicsTab = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMainTopic, setSelectedMainTopic] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // create-main, create-sub, edit
  const [editingTopic, setEditingTopic] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', icon: 'Folder' });

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const res = await API.get('/topics');
      setTopics(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // Derived state
  const mainTopics = topics.filter(t => !t.parent);
  const subTopics = selectedMainTopic ? topics.filter(t => t.parent === selectedMainTopic._id) : [];

  const handleOpenModal = (mode, topic = null) => {
    setModalMode(mode);
    setEditingTopic(topic);
    if (topic) {
      setFormData({ title: topic.title, description: topic.description, icon: topic.icon || 'Folder' });
    } else {
      setFormData({ title: '', description: '', icon: 'Folder' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'edit') {
        const res = await API.put(`/topics/${editingTopic._id}`, formData);
        setTopics(topics.map(t => t._id === editingTopic._id ? res.data : t));
      } else {
        const payload = { ...formData };
        if (modalMode === 'create-sub') {
          payload.parent = selectedMainTopic._id;
        }
        const res = await API.post('/topics', payload);
        setTopics([...topics, res.data]);
      }
      setIsModalOpen(false);
      alert('Success!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this topic? If it is a main topic, all subtopics will be deleted.')) return;
    try {
      await API.delete(`/topics/${id}`);
      setTopics(topics.filter(t => t._id !== id));
      if (selectedMainTopic?._id === id) setSelectedMainTopic(null);
    } catch (err) {
      alert('Failed to delete');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-[600px] border rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Left: Main Topics */}
      <div className="w-1/3 border-r bg-gray-50 flex flex-col">
        <div className="p-4 border-b bg-white flex justify-between items-center sticky top-0 z-10">
          <h3 className="font-bold text-gray-700">Main Topics</h3>
          <button
            onClick={() => handleOpenModal('create-main')}
            className="p-2 bg-hispBlue text-white rounded-full hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-2">
          {mainTopics.map(topic => {
            const Icon = ICON_MAP[topic.icon] || Folder;
            const isSelected = selectedMainTopic?._id === topic._id;
            const count = topics.filter(t => t.parent === topic._id).length;

            return (
              <div
                key={topic._id}
                onClick={() => setSelectedMainTopic(topic)}
                className={`
                  p-3 rounded-lg cursor-pointer flex items-center justify-between group transition-all
                  ${isSelected ? 'bg-white shadow-md border-l-4 border-hispBlue' : 'hover:bg-white hover:shadow-sm'}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${isSelected ? 'bg-blue-50 text-hispBlue' : 'bg-gray-200 text-gray-500'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`font-semibold ${isSelected ? 'text-hispBlue' : 'text-gray-700'}`}>{topic.title}</div>
                    <div className="text-xs text-gray-400">{count} subtopics</div>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => { e.stopPropagation(); handleOpenModal('edit', topic); }} className="p-1 hover:bg-gray-100 rounded text-gray-600"><Edit2 className="w-3 h-3" /></button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(topic._id); }} className="p-1 hover:bg-red-100 rounded text-red-600"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Subtopics */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedMainTopic ? (
          <>
            <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Main Topic:</span>
                <span className="font-bold text-hispBlue text-lg">{selectedMainTopic.title}</span>
              </div>
              <button
                onClick={() => handleOpenModal('create-sub')}
                className="px-4 py-2 bg-hispGreen text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2 font-medium shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Subtopic
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {subTopics.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {subTopics.map(sub => (
                    <div key={sub._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow group relative bg-white">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                            <Hash className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">{sub.title}</h4>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{sub.description || 'No description'}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleOpenModal('edit', sub)} className="text-gray-400 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(sub._id)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Folder className="w-16 h-16 mb-4 opacity-20" />
                  <p>No subtopics yet. Create one to get started!</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50/30">
            <Layout className="w-20 h-20 mb-6 opacity-10" />
            <h3 className="text-xl font-medium text-gray-500">Select a Main Topic</h3>
            <p className="text-sm mt-2">Choose a category from the left to manage its subtopics.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {modalMode === 'edit' ? 'Edit Topic' : modalMode === 'create-main' ? 'New Main Topic' : 'New Subtopic'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-hispBlue focus:border-hispBlue outline-none transition"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g. Web Development"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-hispBlue focus:border-hispBlue outline-none transition"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  placeholder="Short description..."
                />
              </div>

              {(modalMode === 'create-main' || (modalMode === 'edit' && !editingTopic.parent)) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                  <div className="flex gap-2 flex-wrap">
                    {Object.keys(ICON_MAP).map(iconName => {
                      const Icon = ICON_MAP[iconName];
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon: iconName })}
                          className={`p-2 rounded-lg border transition ${formData.icon === iconName ? 'bg-hispBlue text-white border-hispBlue ring-2 ring-offset-1 ring-hispBlue' : 'hover:bg-gray-50 text-gray-600'}`}
                        >
                          <Icon className="w-5 h-5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-hispBlue text-white rounded-lg hover:bg-blue-700 font-medium shadow-md transition transform active:scale-95"
                >
                  Save Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicsTab;