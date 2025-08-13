"use client";
import React, { useEffect, useState } from "react";
import Axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken || "");
  }, []);

  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, [token]);

  const fetchWishlist = async () => {
    try {
      const res = await Axios.get(`${API_BASE}/home/wishlist/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setWishlist(res.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await Axios.delete(`${API_BASE}/home/wishlist/`, {
        headers: { Authorization: `Token ${token}` },
        data: { product_id: productId },
      });
      fetchWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  if (loading) return <div>Loading wishlist...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No products in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow flex flex-col"
            >
              <img
                src={product.image_url || "/placeholder.png"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.brand}</p>
              <p className="text-lg font-bold mb-4">
                Rs. {Number(product.price).toLocaleString("en-IN")}
              </p>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="mt-auto bg-pink-600 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
