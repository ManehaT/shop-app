"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState("");
  // Load token 
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken || "");
  }, []);
  // Fetch products once token is loaded
  useEffect(() => {
    if (token) {
      fetchProducts(""); // empty string triggers recent search logic
    }
  }, [token]);
  const fetchProducts = async (query = "") => {
    try {
      setLoading(true);
      const endpoint = query
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/search?q=${query}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`;
      const response = await axios.get(endpoint, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setProducts(
        query
          ? response.data.results.map(product => ({
              ...product,
              id: product.id,
              product_url: product.product_url || product.url || product.link || "",
            }))
          : response.data
      );
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products.");
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };
  const addToWishlist = async (product_id) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/home/wishlist/`,
        { product_id },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Added to wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist :(");
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      {/* Search */}
      <form onSubmit={handleSearch} className="flex mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            if (value.length > 3) {
              fetchProducts(value);
            }
          }}
          className="border border-gray-300 p-2 rounded-l-md flex-grow"
        />
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 rounded-r-md"
        >
          Search
        </button>
      </form>
      {/* Products */}
      {loading ? (
        <p className="p-4 text-center">Loading products...</p>
      ) : error ? (
        <p className="p-4 text-center text-red-600">{error}</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={product.id || index}
              className={`border rounded-lg p-2 shadow flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-lg ${index === 0 ? 'hidden' : ''}`}
              // className={`border rounded-lg p-2 shadow flex flex-col ${index === 0 ? 'hidden' : ''}`}
            >
              <img
                src={product?.image_url || product?.image}
                alt={product.name}
                className="w-full h-36 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">My Shop</p>
              <div className="text-base font-bold mb-2">
                {product.sale_price ? (
                  <>
                    <span className="text-red-600 mr-1">
                      Rs {Number(product.sale_price).toLocaleString("en-IN")}
                    </span>
                    <span className="line-through text-gray-500">
                      Rs {Number(product.price).toLocaleString("en-IN")}
                    </span>
                  </>
                ) : (
                  <span>Rs {Number(product.price).toLocaleString("en-IN")}</span>
                )}
              </div>
              <div className="flex justify-between mt-auto gap-2">
                <a
                  href={product.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Product
                </a>
                <button
                  onClick={() => addToWishlist(product.id)}
                  className="bg-pink-600 text-white px-2 py-1 rounded hover:bg-pink-400"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}
