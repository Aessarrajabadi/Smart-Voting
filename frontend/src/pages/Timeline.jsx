import React from 'react';
import { motion } from 'framer-motion';

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

  return (
    <div className="page-container animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="page-title">Election Timeline</h1>
        <p className="page-description">Understand the step-by-step process of democratic elections.</p>
      </div>

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* Vertical line */}
        <div style={{ 
          position: 'absolute', 
          left: '50%', 
          top: '0', 
          bottom: '0', 
          width: '2px', 
          background: 'var(--border-color)',
          transform: 'translateX(-50%)',
          zIndex: 0
        }} />

        {steps.map((step, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            key={index}
            style={{ 
              display: 'flex', 
              justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
              marginBottom: '2rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            <div style={{ 
              width: '45%', 
              textAlign: index % 2 === 0 ? 'right' : 'left',
            }}>
              <div className="glass-container" style={{ padding: '1.5rem' }}>
                <span style={{ 
                  display: 'inline-block', 
                  padding: '0.25rem 0.75rem', 
                  background: 'rgba(59, 130, 246, 0.2)', 
                  color: 'var(--primary-color)',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {step.date}
                </span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{step.description}</p>
              </div>
            </div>

            {/* Timeline Dot */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '1.5rem',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: 'var(--primary-color)',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 0 4px var(--bg-color)'
            }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
