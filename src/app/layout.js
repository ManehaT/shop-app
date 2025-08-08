// export default function PublicLayout({ children }) {
//   return (
//     <html>
//       <body>
//         {/* You can add a public navbar here */}
//         {children}
//       </body>
//     </html>
//   );
// }
import '../globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
