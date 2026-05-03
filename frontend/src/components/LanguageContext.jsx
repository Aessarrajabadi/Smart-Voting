import React, { createContext, useContext, useState, useEffect } from 'react';
import { translateText } from '../api/translation';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = async (text) => {
    if (language === 'en') return text;
    
    const cacheKey = `${language}_${text}`;
    if (translations[cacheKey]) return translations[cacheKey];

    const translated = await translateText(text, language);
    setTranslations(prev => ({ ...prev, [cacheKey]: translated }));
    return translated;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
