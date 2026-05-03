import React, { useState, useRef } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SpeechButton from '../components/SpeechButton';
import { useLanguage } from '../components/LanguageContext';
import { useCachedPost } from '../hooks/useApi';

const Eligibility = () => {
  const { language, t } = useLanguage();
  const [age, setAge] = useState('');
  const [citizenship, setCitizenship] = useState('Indian');
  const resultRef = useRef(null);
  
  const { execute, data: result, loading: isLoading, error, setData: setResult, setError } = useCachedPost();

  const checkEligibility = async (e) => {
    e.preventDefault();
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) return;

    try {
      const data = await execute('/eligibility', { age: ageNum, citizenship });
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
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
        <motion.h1 className="page-title" variants={itemVariants}>Voter Eligibility Checker</motion.h1>
        <motion.p className="page-description" variants={itemVariants}>
          Find out if you are eligible to cast your vote in the upcoming elections.
        </motion.p>
      </div>

      <motion.div className="glass-container" style={{ maxWidth: '600px', margin: '0 auto' }} variants={itemVariants}>
        <form onSubmit={checkEligibility} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label htmlFor="age" style={{ fontWeight: '600', fontSize: '1.1rem' }}>Enter Your Age</label>
            <input
              id="age"
              type="number"
              className="input-field"
              placeholder="e.g., 25"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="1"
              max="120"
              aria-label="Your age"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label htmlFor="citizenship" style={{ fontWeight: '600', fontSize: '1.1rem' }}>Are you an Indian Citizen?</label>
            <select
              id="citizenship"
              className="input-field"
              value={citizenship}
              onChange={(e) => setCitizenship(e.target.value)}
              aria-label="Citizenship status"
            >
              <option value="Indian">Yes, I am an Indian Citizen</option>
              <option value="Non-Indian">No, I am not</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn btn-primary" 
              style={{ flex: 2, padding: '1.25rem', fontSize: '1.1rem' }}
              disabled={isLoading}
              aria-label="Check my eligibility"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Check Eligibility'}
            </motion.button>
            <motion.button 
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn glass-container" 
              style={{ flex: 1, padding: '1.25rem', fontSize: '1.1rem' }}
              onClick={() => { setAge('19'); setCitizenship('Indian'); }}
              aria-label="Fill sample data"
              title="Fill with sample data"
            >
              Demo
            </motion.button>
          </div>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-container"
              style={{ 
                marginTop: '2.5rem', 
                textAlign: 'center', 
                background: result.eligible ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${result.eligible ? 'var(--success-color)' : 'var(--danger-color)'}`,
                padding: '2rem'
              }}
              ref={resultRef}
              tabIndex="-1"
              role="status"
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {result.eligible ? (
                  <CheckCircle size={64} style={{ color: 'var(--success-color)' }} />
                ) : (
                  <XCircle size={64} style={{ color: 'var(--danger-color)' }} />
                )}
              </div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: result.eligible ? 'var(--success-color)' : 'var(--danger-color)' }}>
                {result.eligible ? 'Eligible to Vote' : 'Not Eligible'}
              </h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{result.message}</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SpeechButton text={result.message} ariaLabel="Read eligibility result aloud" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Eligibility;
