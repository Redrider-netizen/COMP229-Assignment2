import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpForm } from '../components/AuthComponents';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);

  const handleSuccess = () => {
    setRegistered(true);
    setTimeout(() => navigate('/signin'), 2000);
  };

  return (
    <div className="auth-page">
      {registered ? (
        <div className="success-message">
          <p>Registration successful! Redirecting to Sign In...</p>
        </div>
      ) : (
        <>
          <SignUpForm onSuccess={handleSuccess} />
          <p className="auth-link">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </>
      )}
    </div>
  );
};
