// routes/clothes.js
import express from 'express';
import Cloth from '../models/Cloth.js';

const router = express.Router();

// GET /api/clothes – Fetch all clothes
router.get('/', async (req, res) => {
  try {
    const clothes = await Cloth.find();
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clothes', error });
  }
});

export default router;
