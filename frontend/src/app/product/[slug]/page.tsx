'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '../../store/cart';
import { toast } from 'react-hot-toast';

export default function ProductDetail() {
  const { slug } = useParams();
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => (await axios.get(`/api/products/${slug}`)).data,
    enabled: !!slug,
  });
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    useCart.getState().addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '/placeholder.png',
      qty,
      stock: product.stock,
      slug: product.slug,
    });
    toast.success('Added to cart!');
  };

  if (isLoading) return <div className="text-center py-12">Loading product...</div>;
  if (isError || !product) return <div className="text-center py-12 text-red-500">Product not found.</div>;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10">
      {/* Gallery */}
      <div>
        <img src={product.images?.[0] || '/placeholder.png'} alt={product.name} className="w-full h-96 object-cover rounded mb-4" />
        <div className="flex gap-2 mt-2">
          {product.images?.map((img: string, i: number) => (
            <img key={i} src={img} alt={product.name} className="w-16 h-16 object-cover rounded border" />
          ))}
        </div>
      </div>
      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="text-yellow-700 font-bold text-2xl mb-2">${product.price.toFixed(2)}</div>
        <div className="text-gray-500 mb-2">{product.category?.name}</div>
        <div className="mb-4 text-sm text-gray-600">{product.description}</div>
        <div className="mb-4 text-xs text-gray-400">SKU: {product.sku || 'N/A'} | {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
        <div className="flex items-center gap-2 mb-6">
          <label htmlFor="qty" className="text-sm">Qty:</label>
          <input id="qty" type="number" min={1} max={product.stock} value={qty} onChange={e => setQty(Number(e.target.value))} className="w-16 px-2 py-1 border rounded" />
        </div>
        <button className="px-6 py-2 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition disabled:opacity-50" disabled={product.stock === 0} onClick={addToCart}>Add to Cart</button>
      </div>
    </main>
  );
} 