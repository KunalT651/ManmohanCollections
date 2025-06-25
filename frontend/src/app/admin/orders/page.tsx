'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('admin') || 'null') : null;
    if (!admin) router.push('/admin/login');
    else fetchOrders(admin.token);
    // eslint-disable-next-line
  }, []);

  const fetchOrders = async (token: string) => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/orders', { headers: { Authorization: `Bearer ${token}` } });
      setOrders(res.data);
    } catch {}
    setLoading(false);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin: Orders</h1>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-t">
                <td className="p-2">{order._id}</td>
                <td className="p-2">{order.user?.name || 'N/A'}</td>
                <td className="p-2">${order.totalPrice?.toFixed(2)}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  <button className="text-green-600 hover:underline">Mark Shipped</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
} 