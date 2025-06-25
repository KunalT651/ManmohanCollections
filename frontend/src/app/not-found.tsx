'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold mb-4 text-yellow-600">404</h1>
      <div className="text-xl mb-4">Page Not Found</div>
      <Link href="/" className="px-6 py-2 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition">Go Home</Link>
    </main>
  );
} 