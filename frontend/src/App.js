import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { UsersPage } from './pages/UsersPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ReferencesPage } from './pages/ReferencesPage';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { HomePage } from './pages/HomePage';
import './index.css';

export default function App() {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const saved = localStorage.getItem('authUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = useMemo(() => Boolean(authUser), [authUser]);

  const handleSignIn = (userData) => {
    setAuthUser(userData);
    localStorage.setItem('authUser', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setAuthUser(null);
    localStorage.removeItem('authUser');
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">🏠 Home</Link>
          </li>

          {!isAuthenticated && (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/references">References</Link>
              </li>
              <li>
                <button className="nav-signout" onClick={handleSignOut} type="button">
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <ServicesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/references"
          element={
            <ProtectedRoute>
              <ReferencesPage />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/users" replace /> : <SignUpPage />} />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/users" replace /> : <SignInPage onSignIn={handleSignIn} />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
