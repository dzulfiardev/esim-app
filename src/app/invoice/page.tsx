'use client';

import { Icon } from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import { useRouter } from 'next/navigation';

export default function InvoicePage() {
  const router = useRouter();

  return (
    <div className="max-w-[768px] mx-auto flex flex-col min-h-screen bg-gray-100">
      <header className="flex justify-between items-center bg-[#2B3499] text-white pt-3 pb-12 px-3 sm:px-10 w-full top-0 z-0">
              <div className="flex items-center align-center mt-4 mb-3">
                <button
                  onClick={() => {
                    router.push('/');
                  }}
                  className="mr-2 cursor-pointer"
                  aria-label="Go back">
                  <Icon path={mdiChevronLeft} size={1.2} className="font-bold" />
                </button>
                <h1 className="text-xl font-bold">Invoice</h1>
              </div>
            </header>
    </div>
  )
}