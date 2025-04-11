import mongoose from 'mongoose';

const clothSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['top', 'bottom', 'layer', 'shoes', 'accessory'],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  season: {
    type: String,
    enum: ['summer', 'winter', 'all'],
    default: 'all'
  },
  occasion: {
    type: String,
    enum: ['casual', 'formal', 'party', 'sports', 'ethnic'],
    default: 'casual'
  }
});

const Cloth = mongoose.model('Cloth', clothSchema);

export default Cloth;  