import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="h-screen flex border-4 border-black rounded-md m-4">

      {/* Left side GIF */}
      <div
        className="flex-1 bg-cover"
        style={{
          backgroundImage: "url('/shop.gif')",
          backgroundPosition: "center",
          backgroundSize: "300px 300px",
          backgroundRepeat: "no-repeat",
          minWidth: "25%",  // fixed portion
        }}
      />

      {/* Center Welcome Box */}
      <div className="flex-[2] flex flex-col justify-center items-center bg-white p-12">
        <div className="border-4 border-black p-10 rounded-lg text-center">

          <h1
            className="text-5xl font-bold mb-8 text-pink-600"
            style={{ fontFamily: "'Cookie', cursive" }}
          >
            Welcome to My Shop !
          </h1>

          <div className="space-y-4 w-full max-w-xs mx-auto">
            <Link href="/login" className="w-full block">
              <button className="w-full py-3 bg-pink-600 text-white text-lg font-bold rounded hover:bg-pink-200 transition">
                Login
              </button>
            </Link>
            <Link href="/signup" className="w-full block">
              <button className="w-full py-3 border border-pink-400 text-pink-600 text-lg font-bold rounded hover:bg-pink-200 transition">
                Sign Up
              </button>
             </Link>
          </div>
        </div>        
      </div>

      {/* Right side GIF */}
      <div
        className="flex-1 bg-cover"
        style={{
          backgroundImage: "url('/shop.gif')",
          backgroundPosition: "center",
          backgroundSize: "300px 300px",
          backgroundRepeat: "no-repeat",
          minWidth: "25%",
        }}
      />
    </main>
  );
}
