// export default function SignupPage() {
//   return <h1>This is the Signup Page</h1>;
// }
"use client"; // Important for client-side interactivity in Next.js 13 app directory

import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Update input values
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Submit signup form
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register/`, // Adjust this URL to your Django signup endpoint
        formData
      );

      setMessage("Signup successful! Please log in.");
    } catch (error) {
      setMessage("Signup failed: " + (error.response?.data?.detail || error.message));
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" value={formData.username} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
