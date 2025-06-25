'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminCustomers() {
  const router = useRouter();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('admin') || 'null') : null;
    if (!admin) router.push('/admin/login');
    else fetchCustomers(admin.token);
    // eslint-disable-next-line
  }, []);

  const fetchCustomers = async (token: string) => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/customers', { headers: { Authorization: `Bearer ${token}` } });
      setCustomers(res.data);
    } catch {}
    setLoading(false);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin: Customers</h1>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer._id} className="border-t">
                <td className="p-2">{customer.name}</td>
                <td className="p-2">{customer.email}</td>
                <td className="p-2">
                  <button className="text-blue-600 hover:underline">View Orders</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
} 