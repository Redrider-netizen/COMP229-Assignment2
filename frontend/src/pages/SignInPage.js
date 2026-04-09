import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignInForm } from '../components/AuthComponents';

export const SignInPage = ({ onSignIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleSuccess = (userData) => {
    onSignIn?.(userData);
    setUser(userData);
    setTimeout(() => navigate('/users'), 2000);
  };

  return (
    <div className="auth-page">
      {user ? (
        <div className="success-message">
          <p>Welcome back, {user.firstname}! Redirecting...</p>
        </div>
      ) : (
        <>
          <SignInForm onSuccess={handleSuccess} />
          <p className="auth-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </>
      )}
    </div>
  );
};
