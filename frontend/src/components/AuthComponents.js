import React, { useState } from 'react';
import { authAPI } from '../services/api';

export const SignUpForm = ({ onSuccess }) => {
  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.register(formState);
      onSuccess?.(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="signup-firstname">First Name</label>
        <input
          id="signup-firstname"
          type="text"
          name="firstname"
          value={formState.firstname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="signup-lastname">Last Name</label>
        <input
          id="signup-lastname"
          type="text"
          name="lastname"
          value={formState.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Password"
          required
          minLength={6}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Sign Up'}
      </button>
    </form>
  );
};

export const SignInForm = ({ onSuccess }) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.login(formState);
      onSuccess?.(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="signin-email">Email</label>
        <input
          id="signin-email"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="signin-password">Password</label>
        <input
          id="signin-password"
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};
