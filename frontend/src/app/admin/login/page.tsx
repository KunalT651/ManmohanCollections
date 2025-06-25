'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/admin/login', data);
      localStorage.setItem('admin', JSON.stringify(res.data));
      router.push('/admin/products');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('email', { required: true })} type="email" placeholder="Email" className="w-full px-4 py-2 border rounded" />
        {errors.email && <div className="text-red-500 text-sm">Email is required</div>}
        <input {...register('password', { required: true })} type="password" placeholder="Password" className="w-full px-4 py-2 border rounded" />
        {errors.password && <div className="text-red-500 text-sm">Password is required</div>}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full py-2 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </main>
  );
} 