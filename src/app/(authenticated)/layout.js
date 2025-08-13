'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function AuthenticatedLayout({ children }) {
  const router = useRouter();

  function logout() {
    // Clear cookie and redirect to landing page
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/');
  }

  function goToWishlist() {
    router.push('/home/wishlist/');
  }

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <header className="bg-pink-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 
          onClick={() => router.push('/home')}
          className="text-5xl font-bold" style={{ fontFamily: "'Cookie', cursive" }}>
          My Shop
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={goToWishlist}
            className="bg-white text-pink-600 font-semibold py-2 px-4 rounded hover:bg-pink-100 transition"
          >
            Wishlist
          </button>
          <button
            onClick={logout}
            className="bg-white text-pink-600 font-semibold py-2 px-4 rounded hover:bg-pink-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
