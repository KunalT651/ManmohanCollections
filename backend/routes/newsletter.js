const express = require('express');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await NewsletterSubscriber.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Already subscribed' });
    await NewsletterSubscriber.create({ email });
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 