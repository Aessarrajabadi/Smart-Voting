import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../api/axios';

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I am your Election Education Assistant. How can I help you today? You can ask me about registration, EVMs, or election dates.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

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
    setIsLoading(true);

    try {
      const response = await API.post('/chat', { message: userMessage });
      setMessages([...newMessages, { text: response.data.reply, sender: 'bot' }]);
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : 'Oops! I am having trouble connecting right now.';
      setMessages([...newMessages, { text: errorMessage, sender: 'bot', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container animate-fade-in" style={{ height: 'calc(100vh - 70px)', paddingBottom: '0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 className="page-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>AI Assistant</h1>
        <p className="page-description" style={{ marginBottom: '0' }}>Ask any questions you have about the election process.</p>
      </div>

      <div className="glass-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '2rem', padding: '1rem', overflow: 'hidden' }}>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx} 
              style={{ 
                display: 'flex', 
                gap: '1rem',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
              }}
            >
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                background: msg.sender === 'user' ? 'var(--primary-color)' : 'rgba(139, 92, 246, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} style={{ color: msg.isError ? 'var(--danger-color)' : 'var(--accent-color)' }} />}
              </div>
              <div style={{ 
                background: msg.sender === 'user' ? 'var(--primary-color)' : 'rgba(30, 41, 59, 0.8)',
                padding: '1rem',
                borderRadius: '12px',
                borderTopRightRadius: msg.sender === 'user' ? '0' : '12px',
                borderTopLeftRadius: msg.sender === 'bot' ? '0' : '12px',
                border: msg.isError ? '1px solid var(--danger-color)' : 'none',
              }}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', gap: '1rem', alignSelf: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 size={20} className="animate-spin" style={{ color: 'var(--accent-color)' }} />
              </div>
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '1rem', borderRadius: '12px', borderTopLeftRadius: '0' }}>
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Type your message..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1 }}
            disabled={isLoading}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0 1.5rem' }} disabled={isLoading}>
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
