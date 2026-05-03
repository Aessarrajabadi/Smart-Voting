import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, RefreshCcw, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { db } from '../api/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const questions = [
  {
    question: "What is the minimum age to vote in Indian General Elections?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"],
    correct: 1
  },
  {
    question: "How often are Lok Sabha elections held in India?",
    options: ["Every 4 Years", "Every 5 Years", "Every 6 Years", "Every 3 Years"],
    correct: 1
  },
  {
    question: "Which constitutional body is responsible for conducting elections in India?",
    options: ["Supreme Court", "Parliament", "Election Commission of India", "NITI Aayog"],
    correct: 2
  },
  {
    question: "What does EVM stand for in the context of voting?",
    options: ["Electronic Voting Machine", "Every Voter Matters", "Election Verification Method", "Electronic Voter Management"],
    correct: 0
  },
  {
    question: "What is the meaning of NOTA on a ballot?",
    options: ["None Of The Applicants", "New Official Trust Act", "None Of The Above", "Notice Of Trusted Authority"],
    correct: 2
  }
];

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleOptionClick = async (index) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    const correct = index === questions[currentStep].correct;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);

    setTimeout(async () => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
        if (user) {
          await saveScore(score + (correct ? 1 : 0));
        }
      }
    }, 1500);
  };

  const saveScore = async (finalScore) => {
    setIsSaving(true);
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const currentHighScore = userSnap.data()?.quizHighScore || 0;

      if (finalScore > currentHighScore) {
        await setDoc(userRef, { quizHighScore: finalScore }, { merge: true });
      }
    } catch (error) {
      console.error("Error saving score:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
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
        <h1 className="page-title">Election Literacy Quiz</h1>
        <p className="page-description">Test your knowledge about the democratic process.</p>
      </div>

      <div className="glass-container" style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ width: '100%' }}
              aria-live="polite"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>
              
              <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: '1.4' }}>
                {questions[currentStep].question}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} role="radiogroup" aria-label="Question options">
                {questions[currentStep].options.map((option, index) => {
                  let bgColor = 'rgba(255, 255, 255, 0.05)';
                  let borderColor = 'var(--border-color)';
                  
                  if (selectedOption === index) {
                    bgColor = isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
                    borderColor = isCorrect ? 'var(--success-color)' : 'var(--danger-color)';
                  } else if (selectedOption !== null && index === questions[currentStep].correct) {
                    bgColor = 'rgba(16, 185, 129, 0.1)';
                    borderColor = 'var(--success-color)';
                  }

                  return (
                    <motion.button
                      key={index}
                      role="radio"
                      aria-checked={selectedOption === index}
                      whileHover={selectedOption === null ? { scale: 1.02, background: 'rgba(255, 255, 255, 0.1)' } : {}}
                      whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                      onClick={() => handleOptionClick(index)}
                      style={{
                        padding: '1.25rem',
                        textAlign: 'left',
                        background: bgColor,
                        border: `1px solid ${borderColor}`,
                        borderRadius: '12px',
                        color: 'var(--text-primary)',
                        cursor: selectedOption === null ? 'pointer' : 'default',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {option}
                      {selectedOption === index && (
                        isCorrect ? <CheckCircle2 color="var(--success-color)" /> : <XCircle color="var(--danger-color)" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center' }}
              aria-live="assertive"
            >
              <Trophy size={80} color={score === questions.length ? "var(--primary-color)" : "var(--accent-color)"} style={{ marginBottom: '1.5rem' }} />
              {score === questions.length && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: 'var(--primary-color)', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.2rem' }}
                >
                  🏅 Smart Voter Badge Earned!
                </motion.div>
              )}
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Quiz Completed!</h2>
              <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetQuiz}
                  className="btn glass-container"
                  style={{ gap: '0.5rem' }}
                >
                  <RefreshCcw size={20} /> Try Again
                </motion.button>
                <Link to="/" className="btn btn-primary">
                  Go Home <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Quiz;
