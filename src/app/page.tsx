'use client';

import Header from "@/components/Header";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div className="max-w-[768px] mx-auto flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow pb-15 z-2">
        <ProductList />
      </main>
    </div>
  );
}
