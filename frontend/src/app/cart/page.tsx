'use client';
import { useCart } from '../../store/cart';
import Link from 'next/link';

export default function CartPage() {
  const { items, updateQty, removeFromCart, clearCart } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center text-gray-500">
          Your cart is empty.<br />
          <Link href="/shop" className="text-yellow-600 font-semibold">Continue Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {items.map(item => (
            <div key={item.productId} className="flex items-center gap-4 bg-white rounded shadow p-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <Link href={`/product/${item.slug}`} className="font-semibold text-lg hover:underline">{item.name}</Link>
                <div className="text-yellow-700 font-bold">${item.price.toFixed(2)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <label htmlFor={`qty-${item.productId}`} className="text-sm">Qty:</label>
                  <input id={`qty-${item.productId}`} type="number" min={1} max={item.stock} value={item.qty} onChange={e => updateQty(item.productId, Number(e.target.value))} className="w-16 px-2 py-1 border rounded" />
                </div>
              </div>
              <button onClick={() => removeFromCart(item.productId)} className="text-red-500 font-bold px-2 py-1 rounded hover:bg-red-50">Remove</button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-8">
            <button onClick={clearCart} className="text-sm text-gray-500 hover:underline">Clear Cart</button>
            <div className="text-xl font-bold">Subtotal: ${subtotal.toFixed(2)}</div>
          </div>
          <Link href="/checkout" className="block w-full mt-6 py-3 bg-yellow-500 text-white text-center rounded font-semibold hover:bg-yellow-600 transition">Proceed to Checkout</Link>
        </div>
      )}
    </main>
  );
} 