import React, { useState, useEffect } from 'react';
import { UserForm, UserList } from '../components/UserComponents';
import { userAPI } from '../services/api';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getAll();
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setEditingUser(null);
    await fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(u => u._id !== userId));
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <UserForm onSave={handleSave} editingUser={editingUser} onCancel={handleCancel} />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
    </div>
  );
};
