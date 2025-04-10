import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload.js';
import clothesRoutes from './routes/clothes.js'; 
import cors from 'cors';
import axios from 'axios';

dotenv.config();
const app = express();

connectDB(); // MongoDB connection
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', uploadRoutes);
app.use('/api/clothes', clothesRoutes);

// AI Suggestion Route (OpenRouter)
app.post('/api/ai-outfit', async (req, res) => {
  const { weather, clothes } = req.body;

  const prompt = `
You are a fashion assistant. Based on the weather:
- Temperature: ${weather.temperature}°C
- Condition: ${weather.condition}

And this wardrobe: ${clothes.map(c => `${c.color} ${c.type}`).join(', ')}

Suggest a stylish outfit using only the clothes available. Output format:
Top: ...
Bottom: ...
Layer (if needed): ...
Accessories: ...
Shoes: ...
  `;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openchat/openchat-3.5-1210", // free model
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173', // Or your frontend URL
          'X-Title': 'StyleMate',
        },
      }
    );

    const suggestion = response.data.choices[0].message.content;
    res.json({ suggestion });
  } catch (err) {
    console.error('AI Suggestion Error:', err.message);
    res.status(500).json({ error: 'AI Suggestion Failed' });
  }
});

app.get('/', (req, res) => {
  res.send('StyleMate Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
