'use client';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../store/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/register', data);
      registerUser(res.data);
      router.push('/user/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('name', { required: true })} placeholder="Full Name" className="w-full px-4 py-2 border rounded" />
        {errors.name && <div className="text-red-500 text-sm">Name is required</div>}
        <input {...register('email', { required: true })} type="email" placeholder="Email" className="w-full px-4 py-2 border rounded" />
        {errors.email && <div className="text-red-500 text-sm">Email is required</div>}
        <input {...register('password', { required: true })} type="password" placeholder="Password" className="w-full px-4 py-2 border rounded" />
        {errors.password && <div className="text-red-500 text-sm">Password is required</div>}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full py-2 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
      <div className="text-center mt-4 text-sm">
        <a href="/user/login" className="text-yellow-600 hover:underline">Already have an account? Login</a>
      </div>
    </main>
  );
} 