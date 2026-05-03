import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, MessageSquare, Clock, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import SpeechButton from '../components/SpeechButton';

const Home = () => {
  const pageText = "Empowering the Future of Voting. Smart Vote AI is your personal election education assistant. Discover if you're eligible, chat with our AI to learn the process, verify news, and follow the election timeline.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="page-container" 
      role="main"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div style={{ textAlign: 'center', margin: '4rem 0', position: 'relative' }}>
        <motion.div 
          style={{ position: 'absolute', right: 0, top: 0 }}
          variants={itemVariants}
        >
          <SpeechButton text={pageText} ariaLabel="Read introduction aloud" />
        </motion.div>
        
        <motion.h1 
          className="page-title" 
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}
          variants={itemVariants}
        >
          Empowering the <br /> 
          <span style={{ color: 'var(--primary-color)' }}>Future of Voting</span>
        </motion.h1>
        
        <motion.p 
          className="page-description" 
          style={{ maxWidth: '800px', margin: '0 auto 3rem auto', fontSize: '1.2rem' }}
          variants={itemVariants}
        >
          Smart Vote AI is your personal election education assistant. Discover if you're eligible, chat with our AI to learn the process, verify news, and follow the election timeline.
        </motion.p>
        
        <motion.div 
          style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/chat" 
              className="btn btn-primary" 
              style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}
              aria-label="Ask our AI assistant about voting"
            >
              Ask AI Assistant <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/eligibility" 
              className="btn glass-container" 
              style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}
              aria-label="Check if you are eligible to vote"
            >
              Check Eligibility
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.section 
        aria-label="Key Features" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2.5rem', 
          marginTop: '6rem' 
        }}
        variants={containerVariants}
      >
        <motion.div 
          className="glass-container"
          variants={itemVariants}
          whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          tabIndex="0"
          role="article"
        >
          <ShieldCheck size={48} style={{ color: 'var(--success-color)', marginBottom: '1.5rem' }} aria-hidden="true" />
          <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Fake News Detector</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Verify election-related news and information with our simple detector tool.</p>
        </motion.div>
        
        <motion.div 
          className="glass-container"
          variants={itemVariants}
          whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          tabIndex="0"
          role="article"
        >
          <MessageSquare size={48} style={{ color: 'var(--accent-color)', marginBottom: '1.5rem' }} aria-hidden="true" />
          <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>AI Chat Support</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Get instant answers about voter registration, polling stations, and how to use an EVM.</p>
        </motion.div>
 
        <motion.div 
          className="glass-container"
          variants={itemVariants}
          whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          tabIndex="0"
          role="article"
        >
          <Clock size={48} style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }} aria-hidden="true" />
          <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Election Timeline</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Follow the step-by-step process of elections from registration to results day.</p>
        </motion.div>

        <motion.div 
          className="glass-container"
          variants={itemVariants}
          whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          tabIndex="0"
          role="article"
        >
          <Trophy size={48} style={{ color: 'var(--accent-color)', marginBottom: '1.5rem' }} aria-hidden="true" />
          <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Interactive Quiz</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Test your knowledge and earn your "Smart Voter" badge with our interactive quiz.</p>
          <Link to="/quiz" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Start Quiz</Link>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
