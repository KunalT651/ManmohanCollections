'use client';
import { useCart } from '../../store/cart';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  postalCode: yup.string().required(),
  country: yup.string().required(),
});

export default function CheckoutPage() {
  const { items } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    // Placeholder for order placement logic
    alert('Order placed! (not yet implemented)');
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8">
        {/* Shipping Address */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="space-y-4">
            <input {...register('name')} placeholder="Full Name" className="w-full px-4 py-2 border rounded" />
            {errors.name && <div className="text-red-500 text-sm">Name is required</div>}
            <input {...register('email')} placeholder="Email" className="w-full px-4 py-2 border rounded" />
            {errors.email && <div className="text-red-500 text-sm">Valid email is required</div>}
            <input {...register('address')} placeholder="Address" className="w-full px-4 py-2 border rounded" />
            {errors.address && <div className="text-red-500 text-sm">Address is required</div>}
            <input {...register('city')} placeholder="City" className="w-full px-4 py-2 border rounded" />
            {errors.city && <div className="text-red-500 text-sm">City is required</div>}
            <input {...register('state')} placeholder="State" className="w-full px-4 py-2 border rounded" />
            {errors.state && <div className="text-red-500 text-sm">State is required</div>}
            <input {...register('postalCode')} placeholder="Postal Code" className="w-full px-4 py-2 border rounded" />
            {errors.postalCode && <div className="text-red-500 text-sm">Postal code is required</div>}
            <input {...register('country')} placeholder="Country" className="w-full px-4 py-2 border rounded" />
            {errors.country && <div className="text-red-500 text-sm">Country is required</div>}
          </div>
        </div>
        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.productId} className="flex justify-between items-center">
                <span>{item.name} x {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          {/* Stripe payment placeholder */}
          <button type="submit" className="w-full py-3 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition">Pay & Place Order</button>
          <Link href="/cart" className="block text-center text-sm text-gray-500 mt-4 hover:underline">Back to Cart</Link>
        </div>
      </form>
    </main>
  );
} 