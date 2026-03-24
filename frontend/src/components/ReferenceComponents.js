import React, { useReducer, useState } from 'react';
import { referenceAPI } from '../services/api';

const initialFormState = {
  firstname: '',
  lastname: '',
  email: '',
  position: '',
  company: '',
};

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

export const ReferenceForm = ({ onSave, editingReference, onCancel }) => {
  const [formState, dispatch] = useReducer(formReducer, editingReference || initialFormState);
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
      if (editingReference && editingReference._id) {
        await referenceAPI.update(editingReference._id, formState);
      } else {
        await referenceAPI.create(formState);
      }
      dispatch({ type: 'RESET' });
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving contact');
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
      <h2>{editingReference ? 'Edit Contact' : 'Add New Contact'}</h2>
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
          Position:
          <input
            type="text"
            name="position"
            value={formState.position}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Company:
          <input
            type="text"
            name="company"
            value={formState.company}
            onChange={handleChange}
            required
          />
        </label>

        <div className="button-group">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : editingReference ? 'Update Contact' : 'Add Contact'}
          </button>
          {editingReference && (
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export const ReferenceList = ({ references = [], onEdit, onDelete, loading = false }) => {
  const [error, setError] = useState('');

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await referenceAPI.delete(id);
        onDelete(id);
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting contact');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading contacts...</div>;
  }

  return (
    <div className="list-container">
      <h2>Contacts List</h2>
      {error && <div className="error">{error}</div>}
      
      {references.length === 0 ? (
        <div className="empty">No contacts found. Add one to get started!</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {references.map((reference) => (
              <tr key={reference._id}>
                <td>{reference.firstname}</td>
                <td>{reference.lastname}</td>
                <td>{reference.email}</td>
                <td>{reference.position}</td>
                <td>{reference.company}</td>
                <td>
                  <div className="actions">
                    <button className="btn-edit" onClick={() => onEdit(reference)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(reference._id)}>
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
