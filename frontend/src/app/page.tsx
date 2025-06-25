'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/newsletter/subscribe', { email });
      toast.success('Subscribed!');
      setEmail('');
    } catch {
      toast.error('Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[60vh] bg-gradient-to-br from-yellow-100 to-pink-100 text-center">
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">
          Welcome to Manmohan Collections
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="text-lg md:text-2xl text-gray-600 max-w-xl mx-auto">
          Discover Indian art, handicrafts, puja items, silver jewelry, and more. Shop authentic, handpicked treasures for every occasion.
        </motion.p>
        <motion.button whileHover={{ scale: 1.05 }} className="mt-8 px-8 py-3 bg-yellow-500 text-white rounded-full font-semibold shadow-lg hover:bg-yellow-600 transition">Shop Now</motion.button>
      </section>

      {/* Featured Collections */}
      <section className="py-12 px-4 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example featured cards */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src="/featured1.jpg" alt="Statues" className="w-32 h-32 object-cover mb-4 rounded-full" />
            <h3 className="font-semibold text-lg mb-2">Divine Statues</h3>
            <p className="text-gray-500 text-sm">Handcrafted idols for your home and puja room.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src="/featured2.jpg" alt="Jewelry" className="w-32 h-32 object-cover mb-4 rounded-full" />
            <h3 className="font-semibold text-lg mb-2">Silver Jewelry</h3>
            <p className="text-gray-500 text-sm">Elegant, authentic silver pieces for every occasion.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src="/featured3.jpg" alt="Gift Boxes" className="w-32 h-32 object-cover mb-4 rounded-full" />
            <h3 className="font-semibold text-lg mb-2">Gift Boxes</h3>
            <p className="text-gray-500 text-sm">Curated gift sets for festivals and celebrations.</p>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-12 px-4 md:px-12 bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Top Categories</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <span className="px-6 py-2 bg-pink-100 rounded-full font-medium text-pink-700">Statues</span>
          <span className="px-6 py-2 bg-yellow-100 rounded-full font-medium text-yellow-700">Jewelry</span>
          <span className="px-6 py-2 bg-green-100 rounded-full font-medium text-green-700">Incense</span>
          <span className="px-6 py-2 bg-blue-100 rounded-full font-medium text-blue-700">Puja Essentials</span>
          <span className="px-6 py-2 bg-purple-100 rounded-full font-medium text-purple-700">Gift Boxes</span>
        </div>
      </section>

      {/* Newsletter Signup Placeholder */}
      <section className="py-12 px-4 md:px-12 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">Sign up for our newsletter to get the latest deals, new arrivals, and festival specials delivered to your inbox.</p>
        <form className="flex flex-col md:flex-row gap-4 w-full max-w-md" onSubmit={handleNewsletter}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none" required />
          <button type="submit" className="px-6 py-2 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 transition" disabled={loading}>{loading ? 'Subscribing...' : 'Subscribe'}</button>
        </form>
      </section>
    </main>
  );
}
