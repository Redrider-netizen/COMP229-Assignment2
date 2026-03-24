import React, { useReducer, useState } from 'react';
import { userAPI } from '../services/api';

// Initial state for form
const initialFormState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

// Form reducer
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialFormState;
    case 'SET_DATA':
      return action.payload;
    default:
      return state;
  }
};

export const UserForm = ({ onSave, editingUser, onCancel }) => {
  const [formState, dispatch] = useReducer(formReducer, editingUser || initialFormState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (editingUser && editingUser._id) {
        await userAPI.update(editingUser._id, formState);
      } else {
        await userAPI.create(formState);
      }
      dispatch({ type: 'RESET' });
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving user');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    dispatch({ type: 'RESET' });
    onCancel?.();
  };

  return (
    <div className="form-container">
      <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={formState.firstname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={formState.lastname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            required={!editingUser}
          />
        </label>

        <div className="button-group">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : editingUser ? 'Update User' : 'Add User'}
          </button>
          {editingUser && (
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// User List Component
export const UserList = ({ users = [], onEdit, onDelete, loading = false }) => {
  const [error, setError] = useState('');

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.delete(id);
        onDelete(id);
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting user');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="list-container">
      <h2>Users List</h2>
      {error && <div className="error">{error}</div>}
      
      {users.length === 0 ? (
        <div className="empty">No users found. Add one to get started!</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>
                  <div className="actions">
                    <button className="btn-edit" onClick={() => onEdit(user)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
