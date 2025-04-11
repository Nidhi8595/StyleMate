import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload.js';
import clothesRoutes from './routes/clothes.js';
import deleteRoutes from './routes/delete.js';
import cors from 'cors';
import axios from 'axios';

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', uploadRoutes);
app.use('/api/clothes', clothesRoutes);
app.use('/api', deleteRoutes);

// AI Suggestion Route (HuggingFace)
app.post('/api/ai-outfit', async (req, res) => {
  const { weather, clothes } = req.body;

  const prompt = `
You are a fashion assistant. Based on the weather:
- Temperature: ${weather?.temperature ?? 'N/A'}°C
- Condition: ${weather?.condition ?? 'N/A'}

And this wardrobe: ${clothes?.map(c => `${c.color} ${c.type}`).join(', ') ?? 'No clothes'}

Suggest a stylish outfit using only the clothes available. Output format:
Top: ...
Bottom: ...
Layer (if needed): ...
Accessories: ...
Shoes: ...
  `;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      {
        inputs: prompt,
        parameters: { max_new_tokens: 200 },
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const suggestion = response.data?.[0]?.generated_text?.split('Output format:')[1]?.trim() || "No suggestion received.";
    res.json({ suggestion });
  } catch (err) {
    console.error('AI Suggestion Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'AI Suggestion Failed', details: err.response?.data || err.message });
  }
});

app.get('/', (req, res) => {
  res.send('StyleMate Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





