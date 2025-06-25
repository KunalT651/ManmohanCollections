'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

export default function Shop() {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => (await axios.get('/api/products')).data,
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Shop Products</h1>
      {isLoading && <div className="text-center text-gray-500">Loading products...</div>}
      {isError && <div className="text-center text-red-500">Failed to load products.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products?.map((product: any) => (
          <Link key={product._id} href={`/product/${product.slug}`} className="block bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            <img src={product.images?.[0] || '/placeholder.png'} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
            <div className="text-yellow-700 font-bold text-xl mb-2">${product.price.toFixed(2)}</div>
            <div className="text-sm text-gray-500 mb-2">{product.category?.name}</div>
            <div className="text-xs text-gray-400">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
          </Link>
        ))}
      </div>
    </main>
  );
} 