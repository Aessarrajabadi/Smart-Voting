import React, { useState, memo } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SpeechButton = memo(({ text, ariaLabel = "Read this section aloud" }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speak}
      className={`speech-btn ${isSpeaking ? 'speaking' : ''}`}
      aria-label={isSpeaking ? "Stop reading" : ariaLabel}
      title={isSpeaking ? "Stop reading" : ariaLabel}
    >
      {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
});

export default SpeechButton;
