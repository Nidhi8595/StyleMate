import mongoose from 'mongoose';

const clothSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['top', 'bottom', 'layer'],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const Cloth = mongoose.model('Cloth', clothSchema);

export default Cloth;
