// pages/index.js
import Link from "next/link";
import Form from '@/components/form';

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Hello Next Js
      </h1>
    </div>
  );
}
