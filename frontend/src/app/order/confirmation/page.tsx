'use client';
import Link from 'next/link';

export default function OrderConfirmation() {
  // In a real app, order ID would come from query params or state
  const orderId = 'ORDER123456';
  return (
    <main className="max-w-md mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Thank you for your order!</h1>
      <div className="mb-4">Your order ID is <span className="font-mono text-lg">{orderId}</span></div>
      <div className="mb-8 text-gray-600">A confirmation email has been sent. Estimated delivery: 5-7 business days.</div>
      <Link href="/shop" className="inline-block px-6 py-2 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition">Continue Shopping</Link>
    </main>
  );
} 