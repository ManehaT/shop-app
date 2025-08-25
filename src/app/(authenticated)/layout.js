'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthenticatedLayout({ children }) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Ensure localStorage access only on client side
    const storedUsername = localStorage.getItem("user") || "User";
    setUsername(storedUsername);
  }, []);

  function logout() {
    document.cookie = 'token=; path=/; max-age=0';
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    router.push('/');
  }

  function goToWishlist() {
    router.push('/home/wishlist/');
  }

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      {/* Header */}
      <header className="bg-pink-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1
          onClick={() => router.push('/home')}
          className="text-5xl font-bold cursor-pointer"
          style={{ fontFamily: "'Cookie', cursive" }}
        >
          My Shop
        </h1>

        <div className="flex space-x-4 relative">
          {/* Wishlist Button */}
          <button
            onClick={goToWishlist}
            className="bg-white text-pink-600 font-semibold py-2 px-4 rounded hover:bg-pink-100 transition"
          >
            Wishlist
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-pink-600 font-semibold py-2 px-4 rounded hover:bg-pink-100 transition flex items-center gap-1"
            >
              Profile ▼
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                <div className="px-4 py-2 text-gray-700 text-sm border-b">
                  Logged in as <span className="font-semibold">{username}</span>
                </div>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-pink-600 hover:bg-pink-50 font-semibold rounded-b-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
