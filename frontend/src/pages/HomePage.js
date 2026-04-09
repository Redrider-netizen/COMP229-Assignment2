import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '👤',
    title: 'Users',
    description: 'Manage user accounts — create, view, update, and remove users from your system.',
    link: '/users',
    color: 'card-green',
  },
  {
    icon: '🚀',
    title: 'Projects',
    description: 'Track your portfolio projects with completion dates and detailed descriptions.',
    link: '/projects',
    color: 'card-blue',
  },
  {
    icon: '⚙️',
    title: 'Services',
    description: 'Showcase the professional services you offer with rich imagery and text.',
    link: '/services',
    color: 'card-orange',
  },
  {
    icon: '📋',
    title: 'References',
    description: 'Collect and display references and testimonials from clients and colleagues.',
    link: '/references',
    color: 'card-red',
  },
];

export const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">COMP229 · Full-Stack Portfolio</div>
          <h1 className="hero-title">
            Welcome to Your <span className="hero-highlight">Portfolio</span> Dashboard
          </h1>
          <p className="hero-subtitle">
            A modern platform to manage your users, showcase projects, list services,
            and display references — all in one place.
          </p>
          <div className="hero-actions">
            <Link to="/signin" className="btn-hero-primary">
              Sign In
            </Link>
            <Link to="/signup" className="btn-hero-secondary">
              Create Account
            </Link>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="hero-blob blob-1" />
          <div className="hero-blob blob-2" />
          <div className="hero-orb">
            <span className="hero-orb-icon">🌐</span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">4</span>
          <span className="stat-label">Modules</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-number">REST</span>
          <span className="stat-label">API</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-number">MongoDB</span>
          <span className="stat-label">Database</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-number">React</span>
          <span className="stat-label">Frontend</span>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Explore the Platform</h2>
          <p className="section-subtitle">Everything you need to manage your professional portfolio</p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <Link to={f.link} key={f.title} className={`feature-card ${f.color}`}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
              <span className="feature-cta">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p>Sign in to your account or create a new one to access the dashboard.</p>
          <Link to="/signin" className="btn-hero-primary">
            Sign In Now
          </Link>
        </div>
      </section>
    </div>
  );
};
