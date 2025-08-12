
// THIS IS THE WRAPPER DONT TOUCH THIS 
import '../globals.css'

export const metadata = {
  title: 'My Shop', // tab title
  icons: {
    icon: '/icon.png', // favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          // href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
          href="https://fonts.googleapis.com/css2?family=Cookie&display=swap"

          rel="stylesheet"        
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
