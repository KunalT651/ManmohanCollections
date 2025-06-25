'use client';
import { useAuth } from '../../../store/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/user/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">My Account</h1>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div className="mb-2"><span className="font-semibold">Name:</span> {user.name}</div>
        <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
      </div>
      <button onClick={logout} className="w-full py-2 bg-gray-200 text-gray-700 rounded font-semibold hover:bg-gray-300 transition">Logout</button>
    </main>
  );
} 