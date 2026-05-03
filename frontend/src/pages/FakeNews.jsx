import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../api/axios';

const FakeNews = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const analyzeNews = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const response = await API.post('/fake-news', { text });
      setResult(response.data);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Unable to analyze text at the moment.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <ShieldAlert size={48} style={{ color: 'var(--primary-color)', margin: '0 auto 1rem auto' }} />
          <h1 className="page-title">Fake News Detector</h1>
          <p className="page-description">Paste any election-related message or news snippet below to check its authenticity.</p>
        </div>

        <form onSubmit={analyzeNews} className="glass-container" style={{ marginBottom: '2rem' }}>
          <textarea 
            className="input-field"
            placeholder="Paste text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            style={{ resize: 'vertical', marginBottom: '1rem' }}
            required
            disabled={isAnalyzing}
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isAnalyzing}>
            {isAnalyzing ? <><Loader2 className="animate-spin" size={20} /> Analyzing...</> : <><Search size={20} /> Analyze Text</>}
          </button>
        </form>

        {error && (
          <div className="glass-container" style={{ borderColor: 'var(--danger-color)', color: 'var(--danger-color)', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-container"
            style={{
              borderColor: result.is_fake ? 'var(--danger-color)' : 'var(--success-color)',
              background: result.is_fake ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              {result.is_fake ? (
                <ShieldAlert size={32} style={{ color: 'var(--danger-color)' }} />
              ) : (
                <ShieldCheck size={32} style={{ color: 'var(--success-color)' }} />
              )}
              <h3 style={{ fontSize: '1.5rem', color: result.is_fake ? 'var(--danger-color)' : 'var(--success-color)' }}>
                {result.is_fake ? 'High Risk of Misinformation' : 'Appears Safe'}
              </h3>
            </div>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{result.message}</p>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Confidence Score: {(result.confidence * 100).toFixed(0)}%
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FakeNews;
