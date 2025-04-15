import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SentimentForm = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/analyze', { text });
      setResult(res.data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const autoResize = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = `${ta.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResize();
  }, [text]);

  return (
    <div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
        rows="1"
        style={{
          width: '100%',
          background: 'var(--input-bg)',
          color: 'var(--text)',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '10px',
          resize: 'none',
          overflow: 'hidden',
        }}
      />
      <button onClick={analyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Sentiment'}
      </button>

      {result && (
        <div style={{ marginTop: '10px' }}>
          <strong>Sentiment:</strong> {result.sentiment} <br />
          <strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%
        </div>
      )}
    </div>
  );
};

export default SentimentForm;
