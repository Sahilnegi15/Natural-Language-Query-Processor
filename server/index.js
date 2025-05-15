import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
app.use(cors());          
app.use(express.json());    

const port = 5000;


app.post('/nlqp', (req, res) => {
  const query = req.body.query; 

  const cProgram = spawn('compiler\main.c');  

  let output = '';

  
  cProgram.stdin.write(query + '\n');
  cProgram.stdin.end();  
  
  cProgram.stdout.on('data', (data) => {
    output += data.toString(); 
  });

 
  cProgram.stderr.on('data', (err) => {
    console.error('Error from C program:', err.toString());
  });

  
  cProgram.on('close', (code) => {
    console.log(`C program exited with code ${code}`);
    res.json({ sql: output.trim() });  
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
