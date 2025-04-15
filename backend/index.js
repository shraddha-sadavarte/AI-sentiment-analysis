import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
const PORT = 5000;

app.use(cors({
    origin: '*', // You can replace '*' with 'http://localhost:5173' for more security
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }));
app.use(express.json());

app.post('/analyze', (req, res) => {
  const text = req.body.text;
  console.log("Received text:", text);

  // Pass the text to the Python script for analysis
  const python = spawn('python', ['analyze.py', text]);

  let result = '';
  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.on('close', () => {
    console.log("Python script result:", result);
    
    // The result from Python will be in "sentiment|confidence" format
    const [sentiment, confidence] = result.trim().split('|');
    
    // If confidence is not a valid number, set it to 0
    const confidenceScore = isNaN(confidence) ? 0 : parseFloat(confidence);

    // Return sentiment and confidence score to the frontend
    res.json({ sentiment, confidence: confidenceScore });
  });

  python.stderr.on('data', (data) => {
    console.error("Python error:", data.toString());
    res.status(500).json({ error: 'Error analyzing text' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
