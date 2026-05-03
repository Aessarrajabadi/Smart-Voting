import React, { useState, useRef } from 'react';
import { ShieldAlert, ShieldCheck, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SpeechButton from '../components/SpeechButton';
import { useLanguage } from '../components/LanguageContext';
import { useCachedPost } from '../hooks/useApi';

const FakeNews = () => {
  const { language, t } = useLanguage();
  const [text, setText] = useState('');
  const resultRef = useRef(null);
  
  const { execute, data: result, loading: isAnalyzing, error, setData: setResult, setError } = useCachedPost();

  const analyzeNews = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const data = await execute('/fake-news', { text });
      if (language !== 'en' && data) {
        data.message = await t(data.message);
        setResult({ ...data });
      }
      setTimeout(() => resultRef.current?.focus(), 100);
    } catch (err) {
      // Error is handled by useApi
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.h1 className="page-title" variants={itemVariants}>Fake News Detector</motion.h1>
        <motion.p className="page-description" variants={itemVariants}>
          Enter any election-related news or information to check its authenticity.
        </motion.p>
      </div>

      <motion.div className="glass-container" style={{ maxWidth: '800px', margin: '0 auto' }} variants={itemVariants}>
        <form onSubmit={analyzeNews} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label htmlFor="news-text" style={{ fontWeight: '600', fontSize: '1.1rem' }}>News Snippet</label>
            <textarea
              id="news-text"
              className="input-field"
              placeholder="Paste the news text or headline here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ minHeight: '150px', resize: 'vertical', lineHeight: '1.6' }}
              required
              aria-label="News text to analyze"
            />
          </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {['Elections postponed in Delhi', 'ECI verified results', 'Rigged voting machines leak'].map((c) => (
            <motion.button
              key={c}
              type="button"
              whileHover={{ scale: 1.05, background: 'rgba(59, 130, 246, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setText(c)}
              className="glass-container"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer', border: '1px solid var(--border-color)' }}
            >
              {c}
            </motion.button>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit" 
          className="btn btn-primary" 
          style={{ padding: '1.25rem', fontSize: '1.1rem', marginTop: '1rem' }}
          disabled={isAnalyzing}
          aria-label="Analyze this news"
        >
          {isAnalyzing ? <Loader2 className="animate-spin" size={24} /> : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={20} />
              <span>Start Analysis</span>
            </div>
          )}
        </motion.button>
      </form>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ 
                color: 'var(--danger-color)', 
                marginTop: '2rem', 
                padding: '1.5rem', 
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid var(--danger-color)',
                borderRadius: '12px',
                textAlign: 'center'
              }}
              role="alert"
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-container"
              style={{ 
                marginTop: '3rem', 
                textAlign: 'center', 
                background: result.is_fake ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                border: `1px solid ${result.is_fake ? 'var(--danger-color)' : 'var(--success-color)'}`,
                padding: '2.5rem'
              }}
              ref={resultRef}
              tabIndex="-1"
              role="status"
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {result.is_fake ? (
                  <div style={{ position: 'relative' }}>
                    <ShieldAlert size={80} style={{ color: 'var(--danger-color)' }} />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 2 }}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', background: 'var(--danger-color)', opacity: 0.1 }}
                    />
                  </div>
                ) : (
                  <ShieldCheck size={80} style={{ color: 'var(--success-color)' }} />
                )}
              </div>
              
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: result.is_fake ? 'var(--danger-color)' : 'var(--success-color)' }}>
                {result.is_fake ? 'Potential Misinformation' : 'Likely Authentic'}
              </h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Confidence Score: {(result.confidence * 100).toFixed(0)}%
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ height: '100%', background: result.is_fake ? 'var(--danger-color)' : 'var(--success-color)' }}
                  />
                </div>
              </div>

              <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '2rem', lineHeight: '1.6' }}>
                {result.message}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SpeechButton text={result.message} ariaLabel="Read analysis result aloud" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default FakeNews;
