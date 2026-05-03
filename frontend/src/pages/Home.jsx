import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', margin: '4rem 0' }} className="animate-fade-in">
        <h1 className="page-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
          Empowering the Future of Voting
        </h1>
        <p className="page-description" style={{ maxWidth: '800px', margin: '0 auto 3rem auto', fontSize: '1.2rem' }}>
          Smart Vote AI is your personal election education assistant. Discover if you're eligible, chat with our AI to learn the process, verify news, and follow the election timeline.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/chat" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Ask AI Assistant <ArrowRight size={20} />
          </Link>
          <Link to="/eligibility" className="btn glass-container" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Check Eligibility
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
        <motion.div 
          className="glass-container"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <ShieldCheck size={40} style={{ color: 'var(--success-color)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Fake News Detector</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Verify election-related news and information with our simple detector tool.</p>
        </motion.div>
        
        <motion.div 
          className="glass-container"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <MessageSquare size={40} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>AI Chat Support</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Get instant answers about voter registration, polling stations, and how to use an EVM.</p>
        </motion.div>

        <motion.div 
          className="glass-container"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <Clock size={40} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Election Timeline</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Follow the step-by-step process of elections from registration to results day.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
