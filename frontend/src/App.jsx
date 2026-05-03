import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Eligibility from './pages/Eligibility';
import Chat from './pages/Chat';
import FakeNews from './pages/FakeNews';
import Timeline from './pages/Timeline';
import Quiz from './pages/Quiz';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/eligibility" element={<PageWrapper><Eligibility /></PageWrapper>} />
            <Route path="/chat" element={<PageWrapper><Chat /></PageWrapper>} />
            <Route path="/fake-news" element={<PageWrapper><FakeNews /></PageWrapper>} />
            <Route path="/timeline" element={<PageWrapper><Timeline /></PageWrapper>} />
            <Route path="/quiz" element={<PageWrapper><Quiz /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
