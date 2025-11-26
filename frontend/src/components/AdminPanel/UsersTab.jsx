import React, { useEffect, useState } from 'react';
import API from '../../api/api';

const UsersTab = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/admin/users').then(res => setUsers(res.data));
  }, []);

  const toggleBlock = async (userId, current) => {
    await API.post(`/admin/users/${userId}/${current ? 'unblock' : 'block'}`);
    setUsers(users.map(u => u._id === userId ? { ...u, isBlocked: !current } : u));
  };

  const makeAdmin = async (userId) => {
    await API.post(`/admin/users/${userId}/make-admin`);
    setUsers(users.map(u => u._id === userId ? { ...u, isAdmin: true } : u));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-2xl font-bold mb-6">Manage Users</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Email</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b">
                <td className="py-4">{user.name}</td>
                <td className="py-4">{user.email}</td>
                <td className="py-4">
                  {user.isAdmin ? (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">ADMIN</span>
                  ) : user.isBlocked ? (
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">BLOCKED</span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">ACTIVE</span>
                  )}
                </td>
                <td className="py-4 space-x-2">
                  {!user.isAdmin && (
                    <button onClick={() => makeAdmin(user._id)} className="btn-green text-sm">
                      Make Admin
                    </button>
                  )}
                  <button
                    onClick={() => toggleBlock(user._id, user.isBlocked)}
                    className={`${user.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-2 rounded text-sm`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTab;