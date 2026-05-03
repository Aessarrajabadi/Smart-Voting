import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Eligibility from './pages/Eligibility';
import Chat from './pages/Chat';
import FakeNews from './pages/FakeNews';
import Timeline from './pages/Timeline';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/fake-news" element={<FakeNews />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
