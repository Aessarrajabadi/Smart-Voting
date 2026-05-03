import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../api/axios';

const Eligibility = () => {
  const [age, setAge] = useState('');
  const [citizenship, setCitizenship] = useState('Indian');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkEligibility = async (e) => {
    e.preventDefault();
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await API.post('/eligibility', { age: ageNum, citizenship });
      setResult(response.data);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to connect to the server. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 className="page-title" style={{ textAlign: 'center' }}>Eligibility Checker</h1>
        <p className="page-description" style={{ textAlign: 'center' }}>
          Find out if you meet the requirements to cast your vote in the upcoming elections.
        </p>

        <form onSubmit={checkEligibility} className="glass-container" style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Age</label>
            <input 
              type="number" 
              className="input-field" 
              placeholder="Enter your age" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="1"
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Citizenship</label>
            <select 
              className="input-field"
              value={citizenship}
              onChange={(e) => setCitizenship(e.target.value)}
            >
              <option value="Indian">Indian</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Check My Eligibility'}
          </button>
        </form>

        {error && (
          <div className="glass-container" style={{ borderColor: 'var(--danger-color)', color: 'var(--danger-color)', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-container" 
            style={{ 
              borderColor: result.eligible ? 'var(--success-color)' : 'var(--danger-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            {result.eligible ? (
              <CheckCircle size={32} style={{ color: 'var(--success-color)' }} />
            ) : (
              <XCircle size={32} style={{ color: 'var(--danger-color)' }} />
            )}
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: result.eligible ? 'var(--success-color)' : 'var(--danger-color)' }}>
                {result.eligible ? 'Eligible' : 'Not Eligible'}
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>{result.message}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Eligibility;
