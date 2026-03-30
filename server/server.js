import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from the Node.js Backend! Docker is working." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});