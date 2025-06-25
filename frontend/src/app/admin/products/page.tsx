'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('admin') || 'null') : null;
    if (!admin) router.push('/admin/login');
    else fetchProducts(admin.token);
    // eslint-disable-next-line
  }, []);

  const fetchProducts = async (token: string) => {
    setLoading(true);
    try {
      const res = await axios.get('/api/products', { headers: { Authorization: `Bearer ${token}` } });
      setProducts(res.data);
    } catch {}
    setLoading(false);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin: Products</h1>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-t">
                <td className="p-2">{product.name}</td>
                <td className="p-2">${product.price.toFixed(2)}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
} 