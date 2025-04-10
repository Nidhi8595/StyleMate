import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload.js';

dotenv.config();
const app = express();

connectDB(); // MongoDB connection

app.use(express.json());

app.use('/api', uploadRoutes);

app.get('/', (req, res) => {
  res.send('StyleMate Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
