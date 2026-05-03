import React from 'react';
import { motion } from 'framer-motion';
import SpeechButton from '../components/SpeechButton';

const Timeline = () => {
  const steps = [
    {
      title: "Voter Registration",
      date: "Ongoing",
      description: "Ensure your name is on the electoral roll by submitting Form 6. You can do this online at nvsp.in or through your local Booth Level Officer."
    },
    {
      title: "Notification of Elections",
      date: "Phase 1",
      description: "The Election Commission officially announces the election dates and the Model Code of Conduct comes into effect."
    },
    {
      title: "Filing of Nominations",
      date: "Phase 2",
      description: "Candidates submit their nomination papers to the Returning Officer."
    },
    {
      title: "Campaigning Period",
      date: "Phase 3",
      description: "Political parties and candidates campaign. This ends 48 hours before the polling day."
    },
    {
      title: "Polling Day",
      date: "Phase 4",
      description: "Voters go to their designated polling stations and cast their votes using Electronic Voting Machines (EVMs)."
    },
    {
      title: "Counting & Results",
      date: "Final Phase",
      description: "Votes are counted and results are officially declared by the Election Commission."
    }
  ];

  const fullTimelineText = steps.map(s => `${s.title}: ${s.description}`).join('. ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="page-container" 
      role="main"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}>
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <SpeechButton text={`Election Timeline. ${fullTimelineText}`} ariaLabel="Read entire timeline" />
        </div>
        <motion.h1 className="page-title" variants={itemVariants}>Election Journey</motion.h1>
        <motion.p className="page-description" variants={itemVariants}>
          A comprehensive guide through the phases of a democratic election.
        </motion.p>
      </div>

      <div 
        style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}
        role="list"
        aria-label="Election process steps"
      >
        {/* Modern Timeline Line */}
        <div style={{ 
          position: 'absolute', 
          left: '50px', 
          top: '0', 
          bottom: '0', 
          width: '2px', 
          background: 'linear-gradient(to bottom, transparent, var(--primary-color), var(--accent-color), transparent)',
          zIndex: 0
        }} aria-hidden="true" />

        {steps.map((step, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            style={{ 
              display: 'flex', 
              gap: '2.5rem',
              marginBottom: '3rem',
              position: 'relative',
              zIndex: 1
            }}
            role="listitem"
            tabIndex="0"
          >
            {/* Timeline Indicator */}
            <div style={{
              width: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexShrink: 0
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'var(--card-bg)',
                border: '2px solid var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1.2rem',
                color: 'var(--primary-color)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                zIndex: 2
              }}>
                {index + 1}
              </div>
              <div style={{
                marginTop: '0.75rem',
                fontSize: '0.8rem',
                fontWeight: '700',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {step.date}
              </div>
            </div>

            {/* Step Card */}
            <motion.div 
              className="glass-container" 
              style={{ flex: 1, padding: '2rem' }}
              whileHover={{ scale: 1.02, boxShadow: '0 15px 35px rgba(0,0,0,0.3)' }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{step.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>{step.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Timeline;
