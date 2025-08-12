"use client";

import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = 'http://127.0.0.1:8000'; // change if needed
  const [token, setToken] = useState('');

  // Fetch wishlist items on component mount
  useEffect(() => {
    if(token !== '') {
        fetchWishlist();
    } else {
        console.log("No token");
    }
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log("Token is: ", token);
    setToken(token);
  }, []);

  const fetchWishlist = async () => {
    try {
    //   const token = localStorage.getItem('authToken'); // or wherever you store it
      const res = await Axios.get(`${API_BASE}/wishlist/`, {
        headers: { Authorization: `Token ${token}` }
      });
      setWishlist(res.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
    //   const token = localStorage.getItem('authToken');
if (!token) {
  console.warn('No auth token in localStorage');
  return;
}

await Axios.post(`${API_BASE}/wishlist/`, 
  { product_id: productId }, 
  {
    headers: {
      Authorization: `Token ${token}`, // make sure casing is EXACT
      'Content-Type': 'application/json', // good practice
    }
  }
);
      fetchWishlist(); // Refresh list after adding
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
    //   const token = localStorage.getItem('authToken');
      await Axios.delete(`${API_BASE}/wishlist/`, {
        headers: { Authorization: `Token ${token}` },
        data: { product_id: productId }
      });
      fetchWishlist(); // Refresh list after removal
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  if (loading) return <div>Loading wishlist...</div>;

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No products in wishlist.</p>
      ) : (
        <ul>
          {wishlist.map((product) => (
            <li key={product.id}>
              {product.name} - Rs. {product.price} 
              <button onClick={() => removeFromWishlist(product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {/* Example button to add a product with id 1 */}
      <button onClick={() => addToWishlist(1)}>Add Product 1 to Wishlist</button>
    </div>
  );
};

export default Wishlist;
