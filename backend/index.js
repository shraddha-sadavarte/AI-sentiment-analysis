import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/analyze', (req, res) => {
  const { text } = req.body;

  const python = spawn('python', ['analyze.py', text]);

  let result = '';
  let error = '';

  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.stderr.on('data', (data) => {
    error += data.toString();
  });

  python.on('close', (code) => {
    if (code !== 0) {
      console.error('Python error:', error);
      return res.status(500).json({ error: 'Python script failed', details: error });
    }

    try {
      const parsedResult = JSON.parse(result);
      res.json(parsedResult);
    } catch (e) {
      res.status(500).json({ error: 'Invalid response from Python script', raw: result });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
