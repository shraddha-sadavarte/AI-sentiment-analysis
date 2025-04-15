import React, { useState, useEffect } from 'react';
import SentimentForm from './components/SentimentForm.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import './themes.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div style={{ padding: '20px' }}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <h1>Sentiment Analyzer</h1>
      <SentimentForm />
    </div>
  );
}

export default App;
