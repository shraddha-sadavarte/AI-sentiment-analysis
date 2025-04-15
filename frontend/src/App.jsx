import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');

  const analyzeSentiment = async () => {
    if (!text) return;
    try {
      const res = await axios.post('http://localhost:5000/analyze', { text });
      console.log("Response from backend:", res.data); 
      setSentiment(res.data.sentiment);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    }
  };
  return (
    <div className="App">
      <h1>Sentiment Analyzer</h1>
      <textarea
        rows="5"
        placeholder="Enter text or tweet..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={analyzeSentiment}>Analyze</button>
      {sentiment && (
        <div className="result">
          Sentiment: <strong>{sentiment}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
