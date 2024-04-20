// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Website!</h1>
      <p className="text-lg mb-6">Feel free to explore.</p>
      <Link
        href="/signup"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Sign Up Here
      </Link>
    </div>
  );
}
