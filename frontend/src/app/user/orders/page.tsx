'use client';
import { useAuth } from '../../store/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserOrders() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) router.push('/user/login');
    else fetchOrders(user.token);
    // eslint-disable-next-line
  }, [user]);

  const fetchOrders = async (token: string) => {
    setLoading(true);
    try {
      const res = await axios.get('/api/users/orders', { headers: { Authorization: `Bearer ${token}` } });
      setOrders(res.data);
    } catch {}
    setLoading(false);
  };

  if (!user) return null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Order ID</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-t">
                <td className="p-2">{order._id}</td>
                <td className="p-2">${order.totalPrice?.toFixed(2)}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
} 