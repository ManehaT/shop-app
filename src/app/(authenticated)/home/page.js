"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken || "");
  }, []);

  const fetchProducts = async (query = "") => {
    try {
      setLoading(true);
      const endpoint = query
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/search?q=${query}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`;
      const response = await axios.get(endpoint);
      setProducts(query ? response.data.results : response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

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
      alert("✅ Added to wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("❌ Failed to add to wishlist.");
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
            if (value.length > 3){
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product,index) => (
            <div
              // key={product.id}
              key={product.id || index} // fallback to index if id is missing
              className="border rounded-lg p-4 shadow flex flex-col"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.brand}</p>

              <div className="text-lg font-bold mb-2">
                {product.sale_price ? (
                  <>
                    <span className="text-red-600 mr-2">
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

              <a
                href={product.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mb-4"
              >
                View Product
              </a>

              <button
                onClick={() => addToWishlist(product.id)}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-400 mt-auto"
              >
                Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
