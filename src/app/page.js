// // export default function LoginPage() {
// //   return <h1>This is the Login Page</h1>;
// // }
// 'use client';

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');

//   function handleChange(e) {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login/`, formData);
//       const token = res.data.token;
//       document.cookie = `token=${token}; path=/; max-age=86400;`; // 1 day expiry
//       router.push('/(authenticated)/home');
//     } catch (err) {
//       setError('Login failed: ' + (err.response?.data?.detail || err.message));
//     }
//   }

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto' }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// }
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
      document.cookie = `token=${token}; path=/; max-age=86400;`; // 1 day expiry
      router.push('/(authenticated)/home');
    } catch (err) {
      setError('Login failed: ' + (err.response?.data?.detail || err.message));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
