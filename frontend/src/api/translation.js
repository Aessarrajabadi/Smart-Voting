const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;

export const translateText = async (text, targetLanguage) => {
  if (!text || targetLanguage === 'en') return text;

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
        }),
      }
    );

    const data = await response.json();
    if (data.data && data.data.translations) {
      return data.data.translations[0].translatedText;
    }
    return text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};
