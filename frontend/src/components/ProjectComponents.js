import React, { useReducer, useState } from 'react';
import { projectAPI } from '../services/api';

const initialFormState = {
  title: '',
  description: '',
  completion: '',
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

export const ProjectForm = ({ onSave, editingProject, onCancel }) => {
  const [formState, dispatch] = useReducer(formReducer, editingProject || initialFormState);
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
      if (editingProject && editingProject._id) {
        await projectAPI.update(editingProject._id, formState);
      } else {
        await projectAPI.create(formState);
      }
      dispatch({ type: 'RESET' });
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving project');
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
      <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <label>
          Project Title:
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

        <label>
          Completion Date:
          <input
            type="date"
            name="completion"
            value={formState.completion}
            onChange={handleChange}
            required
          />
        </label>

        <div className="button-group">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Add Project'}
          </button>
          {editingProject && (
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export const ProjectList = ({ projects = [], onEdit, onDelete, loading = false }) => {
  const [error, setError] = useState('');

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.delete(id);
        onDelete(id);
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting project');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="list-container">
      <h2>Projects List</h2>
      {error && <div className="error">{error}</div>}
      
      {projects.length === 0 ? (
        <div className="empty">No projects found. Add one to get started!</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Completion Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{new Date(project.completion).toLocaleDateString()}</td>
                <td>
                  <div className="actions">
                    <button className="btn-edit" onClick={() => onEdit(project)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(project._id)}>
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
