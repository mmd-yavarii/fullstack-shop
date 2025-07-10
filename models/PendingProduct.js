import mongoose, { model, models } from 'mongoose';
import { Schema } from 'mongoose';

const PendingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  images: {
    type: [String],
    required: true,
  },

  qty: {
    type: Number,
    default: 1,
    min: 0,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
});

const PendingProduct = models.PendingProduct || model('PendingProduct', PendingSchema);
export default PendingProduct;
