import React, { useState, useEffect } from 'react';
import { ReferenceForm, ReferenceList } from '../components/ReferenceComponents';
import { referenceAPI } from '../services/api';

export const ReferencesPage = () => {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingReference, setEditingReference] = useState(null);

  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    setLoading(true);
    try {
      const response = await referenceAPI.getAll();
      setReferences(response.data);
    } catch (err) {
      console.error('Error fetching references:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setEditingReference(null);
    await fetchReferences();
  };

  const handleEdit = (reference) => {
    setEditingReference(reference);
  };

  const handleDelete = (referenceId) => {
    setReferences(references.filter(r => r._id !== referenceId));
  };

  const handleCancel = () => {
    setEditingReference(null);
  };

  return (
    <div className="container">
      <h1>Contact Management</h1>
      <ReferenceForm onSave={handleSave} editingReference={editingReference} onCancel={handleCancel} />
      <ReferenceList references={references} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
    </div>
  );
};
