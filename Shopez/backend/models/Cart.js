const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  size: { type: String },
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);