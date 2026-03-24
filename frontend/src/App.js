import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UsersPage } from './pages/UsersPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ReferencesPage } from './pages/ReferencesPage';
import './index.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('users');

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/users" onClick={() => setCurrentPage('users')}>
              Users
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={() => setCurrentPage('projects')}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={() => setCurrentPage('services')}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/references" onClick={() => setCurrentPage('references')}>
              Contacts
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/references" element={<ReferencesPage />} />
        <Route path="/" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}
