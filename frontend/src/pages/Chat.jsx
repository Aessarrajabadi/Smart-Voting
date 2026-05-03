import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/axios';
import SpeechButton from '../components/SpeechButton';
import { useLanguage } from '../components/LanguageContext';
import { useCachedPost } from '../hooks/useApi';

const Chat = () => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState([
    { text: "Hello! I am your Election Education Assistant. How can I help you today? You can ask me about registration, EVMs, or election dates.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const { execute, loading: isLoading } = useCachedPost();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    const newMessages = [...messages, { text: userMessage, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      const data = await execute('/chat', { message: userMessage });
      let reply = data.reply;

      if (language !== 'en' && reply) {
        reply = await t(reply);
      }

      setMessages([...newMessages, { text: reply, sender: 'bot' }]);
    } catch (err) {
      setMessages([...newMessages, { text: err, sender: 'bot', isError: true }]);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">AI Election Assistant</h1>
          <p className="page-description">Instant answers to your voting and registration questions.</p>
        </div>
      </div>

      <div className="glass-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '2rem', padding: '1.5rem', overflow: 'hidden' }}>
        <div 
          style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          role="log"
          aria-live="polite"
          aria-label="Chat history"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={idx} 
                style={{ 
                  display: 'flex', 
                  gap: '1rem',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  alignItems: 'flex-start',
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                }}
              >
                <div style={{ 
                  width: '44px', height: '44px', borderRadius: '12px', 
                  background: msg.sender === 'user' ? 'var(--primary-color)' : 'rgba(139, 92, 246, 0.15)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }} aria-hidden="true">
                  {msg.sender === 'user' ? <User size={24} color="white" /> : <Bot size={24} color="var(--accent-color)" />}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start', gap: '0.5rem' }}>
                  <div style={{ 
                    background: msg.sender === 'user' ? 'var(--primary-color)' : 'var(--card-bg)',
                    color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                    padding: '1.25rem 1.5rem',
                    borderRadius: msg.sender === 'user' ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                    fontSize: '1.05rem',
                    lineHeight: '1.5'
                  }}>
                    <span className="sr-only">{msg.sender === 'user' ? 'You said: ' : 'Assistant replied: '}</span>
                    {msg.text}
                  </div>
                  {msg.sender === 'bot' && !msg.isError && (
                    <SpeechButton text={msg.text} ariaLabel="Read this response aloud" />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', gap: '1rem', alignSelf: 'flex-start' }}
            >
              <div style={{ 
                width: '44px', height: '44px', borderRadius: '12px', 
                background: 'rgba(139, 92, 246, 0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Loader2 className="animate-spin" size={24} color="var(--accent-color)" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {['How to register?', 'EVM instructions', 'Election dates'].map((q) => (
            <motion.button
              key={q}
              whileHover={{ scale: 1.05, background: 'rgba(59, 130, 246, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setInput(q)}
              className="glass-container"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer', border: '1px solid var(--border-color)' }}
            >
              {q}
            </motion.button>
          ))}
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Ask about voter registration, EVMs, or election dates..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, padding: '1rem 1.5rem' }}
            aria-label="Chat input"
          />
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="btn btn-primary" 
            style={{ padding: '0 2rem' }} 
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
