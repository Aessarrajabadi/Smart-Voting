import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Vote, Sun, Moon, Menu, X, LogIn, LogOut, Globe, User as UserIcon, Eye } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';

const Navbar = React.memo(() => {
  const location = useLocation();
  const { user, login, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const [highContrast, setHighContrast] = useState(false);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast');
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'gu', name: 'Gujarati' },
  ];

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Eligibility', path: '/eligibility' },
    { name: 'AI Chat', path: '/chat' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Fake News', path: '/fake-news' },
    { name: 'Quiz', path: '/quiz' },
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <Link to="/" className="nav-logo" aria-label="Smart Vote AI Home">
        <Vote className="text-primary-color" size={28} aria-hidden="true" />
        <span>Smart Vote AI</span>
      </Link>
      
      {/* Desktop Links */}
      <div className="nav-links">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            aria-current={location.pathname === link.path ? 'page' : undefined}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="nav-actions">
        {/* Language Selector */}
        <div className="language-selector">
          <Globe size={20} className="nav-icon" />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="lang-select"
            aria-label="Select Language"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

          {/* Accessibility Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleHighContrast}
            className="btn-icon"
            aria-label={highContrast ? "Disable High Contrast" : "Enable High Contrast"}
            title="Accessibility Mode"
            style={{ color: highContrast ? 'var(--primary-color)' : 'inherit' }}
          >
            <Eye size={20} />
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="btn-icon"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

        {user ? (
          <div className="user-profile">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
            ) : (
              <UserIcon size={20} />
            )}
            <button onClick={logout} className="logout-btn" title="Logout" aria-label="Logout">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button onClick={login} className="login-btn" aria-label="Login with Google" title="Login with Google">
            <LogIn size={20} />
            <span>Login</span>
          </button>
        )}

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu glass-container">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="mobile-lang-selector">
            <Globe size={20} />
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          {user ? (
            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="btn glass-container">Logout</button>
          ) : (
            <button onClick={() => { login(); setIsMenuOpen(false); }} className="btn btn-primary">Login</button>
          )}
        </div>
      )}
    </nav>
  );
});

export default Navbar;
