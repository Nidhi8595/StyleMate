import express from 'express';
import Cloth from '../models/Cloth.js';

const router = express.Router();

router.post('/upload-clothes', async (req, res) => {
  try {
    const { imageUrl, type, color, season, occasion } = req.body;

    // Validation
    if (!imageUrl || !type || !color || !season || !occasion) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const newCloth = new Cloth({
      imageUrl,
      type,
      color,
      season,
      occasion
    });

    await newCloth.save();

    res.status(201).json({ message: 'Cloth uploaded successfully', cloth: newCloth });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
