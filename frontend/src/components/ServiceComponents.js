import React, { useReducer, useState } from 'react';
import { serviceAPI } from '../services/api';

const initialFormState = {
  title: '',
  description: '',
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

export const ServiceForm = ({ onSave, editingService, onCancel }) => {
  const [formState, dispatch] = useReducer(formReducer, editingService || initialFormState);
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
      if (editingService && editingService._id) {
        await serviceAPI.update(editingService._id, formState);
      } else {
        await serviceAPI.create(formState);
      }
      dispatch({ type: 'RESET' });
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving service');
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
      <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <label>
          Service Title:
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            required
          />
        </label>

        <div className="button-group">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : editingService ? 'Update Service' : 'Add Service'}
          </button>
          {editingService && (
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export const ServiceList = ({ services = [], onEdit, onDelete, loading = false }) => {
  const [error, setError] = useState('');

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await serviceAPI.delete(id);
        onDelete(id);
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting service');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading services...</div>;
  }

  return (
    <div className="list-container">
      <h2>Services List</h2>
      {error && <div className="error">{error}</div>}
      
      {services.length === 0 ? (
        <div className="empty">No services found. Add one to get started!</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.title}</td>
                <td>{service.description}</td>
                <td>
                  <div className="actions">
                    <button className="btn-edit" onClick={() => onEdit(service)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(service._id)}>
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
