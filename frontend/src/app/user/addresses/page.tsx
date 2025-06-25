'use client';
import { useAuth } from '../../store/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserAddresses() {
  const { user } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<any[]>(user?.addresses || []);

  useEffect(() => {
    if (!user) router.push('/user/login');
    else setAddresses(user.addresses || []);
    // eslint-disable-next-line
  }, [user]);

  if (!user) return null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Addresses</h1>
      <div className="space-y-4">
        {addresses.length === 0 ? (
          <div className="text-gray-500">No addresses saved.</div>
        ) : addresses.map((addr, i) => (
          <div key={i} className="bg-white rounded shadow p-4 flex justify-between items-center">
            <div>
              <div>{addr.street}, {addr.city}, {addr.state}, {addr.postalCode}, {addr.country}</div>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
        <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition">Add New Address</button>
      </div>
    </main>
  );
} 