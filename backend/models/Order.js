const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  qty: Number,
  price: Number,
  image: String,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [orderItemSchema],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  paymentInfo: {
    id: String,
    status: String,
    method: String,
  },
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  isShipped: { type: Boolean, default: false },
  shippedAt: Date,
  status: { type: String, default: 'Processing' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema); 