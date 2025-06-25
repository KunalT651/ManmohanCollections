"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import axios from "axios";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    axios.get("/api/categories")
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-yellow-600 tracking-tight">Manmohan</Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <button className="font-medium hover:text-yellow-600 transition">Shop ▾</button>
            <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
              {categories.length ? categories.map((cat: any) => (
                <Link key={cat._id} href={`/shop?category=${cat.slug}`} className="block px-4 py-2 hover:bg-yellow-50">{cat.name}</Link>
              )) : <span className="block px-4 py-2 text-gray-400">Loading...</span>}
            </div>
          </div>
          <Link href="/about" className="font-medium hover:text-yellow-600 transition">About</Link>
          <Link href="/contact" className="font-medium hover:text-yellow-600 transition">Contact</Link>
          <Link href="/track-order" className="font-medium hover:text-yellow-600 transition">Track Order</Link>
        </div>
        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <FiShoppingCart size={22} />
            {/* Cart badge placeholder */}
          </Link>
          <Link href="/user" className="hidden md:inline-block">
            <FiUser size={22} />
          </Link>
          {/* Hamburger */}
          <button className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <FiMenu size={26} />
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 flex flex-col">
          <div className="bg-white shadow-lg p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="text-2xl font-bold text-yellow-600">Manmohan</Link>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><FiX size={28} /></button>
            </div>
            <nav className="flex flex-col gap-4">
              <div>
                <span className="block font-semibold mb-2">Shop</span>
                <div className="flex flex-col gap-1">
                  {categories.length ? categories.map((cat: any) => (
                    <Link key={cat._id} href={`/shop?category=${cat.slug}`} className="px-2 py-1 rounded hover:bg-yellow-50" onClick={() => setMobileOpen(false)}>{cat.name}</Link>
                  )) : <span className="text-gray-400">Loading...</span>}
                </div>
              </div>
              <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
              <Link href="/track-order" onClick={() => setMobileOpen(false)}>Track Order</Link>
              <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2"><FiShoppingCart /> Cart</Link>
              <Link href="/user" onClick={() => setMobileOpen(false)} className="flex items-center gap-2"><FiUser /> Account</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 