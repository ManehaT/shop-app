// export default function HomeLayout({ children }) {
//   return (
//     <div>
//       <h2>Homepage is working</h2>
//       {children}
//     </div>
//   );
// }
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function AuthenticatedLayout({ children }) {
  const router = useRouter();

  function logout() {
    document.cookie = 'token=; path=/; max-age=0'; // Clear cookie
    router.push('/');
  }

  return (
    <div>
      <header>
        <button onClick={logout}>Logout</button>
      </header>
      <main>{children}</main>
    </div>
  );
}
