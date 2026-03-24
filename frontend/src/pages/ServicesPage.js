import React, { useState, useEffect } from 'react';
import { ServiceForm, ServiceList } from '../components/ServiceComponents';
import { serviceAPI } from '../services/api';

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await serviceAPI.getAll();
      setServices(response.data);
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setEditingService(null);
    await fetchServices();
  };

  const handleEdit = (service) => {
    setEditingService(service);
  };

  const handleDelete = (serviceId) => {
    setServices(services.filter(s => s._id !== serviceId));
  };

  const handleCancel = () => {
    setEditingService(null);
  };

  return (
    <div className="container">
      <h1>Service Management</h1>
      <ServiceForm onSave={handleSave} editingService={editingService} onCancel={handleCancel} />
      <ServiceList services={services} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
    </div>
  );
};
