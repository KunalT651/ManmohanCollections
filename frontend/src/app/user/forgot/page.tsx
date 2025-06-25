'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axios.post('/api/auth/forgot', data);
      toast.success('Password reset email sent!');
    } catch {
      toast.error('Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('email', { required: true })} type="email" placeholder="Email" className="w-full px-4 py-2 border rounded" />
        {errors.email && <div className="text-red-500 text-sm">Email is required</div>}
        <button type="submit" className="w-full py-2 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Email'}</button>
      </form>
    </main>
  );
} 