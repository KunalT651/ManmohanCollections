'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminCoupons() {
  const router = useRouter();
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('admin') || 'null') : null;
    if (!admin) router.push('/admin/login');
    else fetchCoupons(admin.token);
    // eslint-disable-next-line
  }, []);

  const fetchCoupons = async (token: string) => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/coupons', { headers: { Authorization: `Bearer ${token}` } });
      setCoupons(res.data);
    } catch {}
    setLoading(false);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin: Coupons</h1>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Code</th>
              <th className="p-2">Type</th>
              <th className="p-2">Value</th>
              <th className="p-2">Active</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => (
              <tr key={coupon._id} className="border-t">
                <td className="p-2">{coupon.code}</td>
                <td className="p-2">{coupon.discountType}</td>
                <td className="p-2">{coupon.discountValue}</td>
                <td className="p-2">{coupon.isActive ? 'Yes' : 'No'}</td>
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