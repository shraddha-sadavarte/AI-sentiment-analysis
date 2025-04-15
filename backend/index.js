import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/analyze', (req, res) => {
    const text = req.body.text;
    console.log("Received text:", text);  
  
    const python = spawn('python', ['analyze.py', `"${text}`]);  
  
    let result = '';
    python.stdout.on('data', (data) => {
      result += data.toString();
    });
  
    python.on('close', () => {
      console.log("Python script result:", result);
      res.json({ sentiment: result.trim() });
    });
  
    python.stderr.on('data', (data) => {
      console.error("Python error:", data.toString());  
    });
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
