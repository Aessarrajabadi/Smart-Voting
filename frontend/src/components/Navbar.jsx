import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Vote } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Eligibility', path: '/eligibility' },
    { name: 'AI Chat', path: '/chat' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Fake News', path: '/fake-news' },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <Vote className="text-primary-color" size={28} />
        <span>Smart Vote AI</span>
      </Link>
      
      <div className="nav-links">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
