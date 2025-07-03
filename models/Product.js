import { model, models, Schema } from 'mongoose';

const ProductSchema = new Schema({
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

const Product = models.Product || model('Product', ProductSchema);
export default Product;
