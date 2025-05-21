import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';  // <--- add this import
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());  // <--- enable CORS
app.use(bodyParser.json());

app.post('/parse', (req, res) => {
  const nlqpPath = path.join(__dirname, '../compiler/nlqp.exe');
  console.log('Running executable at:', nlqpPath);

  const nlqpProcess = spawn(nlqpPath);

  nlqpProcess.on('error', (err) => {
    console.error('Failed to start subprocess:', err);
    res.status(500).send('Internal server error running nlqp');
  });

  let output = '';
  nlqpProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  nlqpProcess.stderr.on('data', (data) => {
    console.error('Error from nlqp:', data.toString());
  });

  nlqpProcess.on('close', (code) => {
    console.log(`nlqp process exited with code ${code}`);
    res.send(output);
  });

  nlqpProcess.stdin.write(req.body.query);
  nlqpProcess.stdin.end();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
