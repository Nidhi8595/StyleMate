import express from 'express';
import Cloth from '../models/Cloth.js';

const router = express.Router();

router.delete('/delete-cloth/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the cloth exists
      const cloth = await Cloth.findById(id);
  
      if (!cloth) {
        return res.status(404).json({ error: 'Cloth not found' });
      }
  
      // Delete the cloth
      await Cloth.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Cloth deleted successfully' });
    } catch (err) {
      console.error('Delete error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

export default router;
