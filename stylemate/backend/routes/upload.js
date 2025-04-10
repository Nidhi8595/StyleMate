import express from 'express';
import Cloth from '../models/Cloth.js';

const router = express.Router();

router.post('/upload-clothes', async (req, res) => {
  try {
    const { imageUrl, type, color } = req.body;

    if (!imageUrl || !type || !color) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const newCloth = new Cloth({ imageUrl, type, color });
    await newCloth.save();

    res.status(201).json({ message: 'Cloth uploaded successfully', cloth: newCloth });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
