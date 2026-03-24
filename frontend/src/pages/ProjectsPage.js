import React, { useState, useEffect } from 'react';
import { ProjectForm, ProjectList } from '../components/ProjectComponents';
import { projectAPI } from '../services/api';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await projectAPI.getAll();
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setEditingProject(null);
    await fetchProjects();
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleDelete = (projectId) => {
    setProjects(projects.filter(p => p._id !== projectId));
  };

  const handleCancel = () => {
    setEditingProject(null);
  };

  return (
    <div className="container">
      <h1>Project Management</h1>
      <ProjectForm onSave={handleSave} editingProject={editingProject} onCancel={handleCancel} />
      <ProjectList projects={projects} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
    </div>
  );
};
