const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('reviews');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get product by slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category').populate('reviews');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed dummy products (development only)
router.post('/seed', async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ message: 'Not allowed' });
  }
  try {
    const dummyProducts = [
      {
        name: 'Handcrafted Brass Ganesha',
        slug: 'handcrafted-brass-ganesha',
        description: 'Beautifully detailed brass Ganesha idol for your home or puja room.',
        price: 129.99,
        images: ['https://via.placeholder.com/400x400.png?text=Ganesha'],
        category: null, // Set category after seeding categories
        stock: 10,
        sku: 'MC1001',
        ratings: 4.8,
        reviews: [],
      },
      {
        name: 'Silver Plated Diya Set',
        slug: 'silver-plated-diya-set',
        description: 'Elegant silver-plated diya set for festive occasions.',
        price: 49.99,
        images: ['https://via.placeholder.com/400x400.png?text=Diya+Set'],
        category: null,
        stock: 25,
        sku: 'MC1002',
        ratings: 4.5,
        reviews: [],
      },
    ];
    await Product.deleteMany();
    const products = await Product.insertMany(dummyProducts);
    res.status(201).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 