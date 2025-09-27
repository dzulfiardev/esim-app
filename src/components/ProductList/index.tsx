'use client';

import { useAppSelector } from '@/redux/hooks';
import ProductCard from '../ProductCard';

export default function ProductList() {
  const { filteredESims } = useAppSelector((state) => state.eSim);
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-white rounded-[30px] mt-[-30px] pb-7">
      {filteredESims.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
      {filteredESims.length === 0 && (
        <div className="col-span-2 text-center py-10 text-gray-500">
          Product eSIM tidak ditemukan. Coba ubah filter Anda.
        </div>
      )}
    </div>
  );
}