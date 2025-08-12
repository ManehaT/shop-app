'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login/`, formData);
      const token = res.data.token;
      // saving token in local storage
      localStorage.setItem('authToken', token);
     // Make axios send token for all future requests
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;

      document.cookie = `token=${token}; path=/; max-age=86400;`; // 1 day expiry
      router.push('/home');
    } catch (err) {
      
        setError(
            'Login failed: ' + (err.response?.data?.non_field_errors?.[0] || err.message)
        );

    
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* <h2 className="text-2xl font-bold mb-6 text-center">Login</h2> */}
        <h2
          className="text-6xl mb-6 text-center text-pink-600"
          style={{ fontFamily: "'Cookie', cursive" }}
        >
          Login
        </h2>


        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-xl hover:bg-pink-400 transition duration-200"
          >
            Sign In
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
