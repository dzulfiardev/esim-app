"use client";

import { Icon } from "@mdi/react";
import { mdiChevronLeft, mdiCheck, mdiCheckDecagram, mdiContentCopy } from "@mdi/js";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  formatDateToIndonesian, 
  formatTimeToIndonesianTimezone, 
  formatNumberWithDots,
  maskEmailAddress,
  maskWhatsappNumber,  
} from "@/lib/utils";

interface OrderData {
  productId: string;
  productTitle: string;
  productRegion: string;
  productType: string;
  selectedData: string;
  selectedValidity: string;
  price: string;
  price_raw: number;
  timestamp: string;
  unix_time: number;
  nama?: string;
  email?: string;
  whatsapp?: string;
  paymentMethod?: string;
}

export default function InvoicePage() {
  const router = useRouter();
  const chargeFeeRaw = 2000;

  const [chargeFee, setChargeFee] = useState<string>("");
  const [defaultPrice, setDefaultPrice] = useState<string>("");
  const [defaultPriceRaw, setDefaultPriceRaw] = useState<number | undefined>(0);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [formattedTime, setFormattedTime] = useState<string>(""); 
  const [maskEmail, setMaskEmail] = useState<string>("");
  const [maskWhatsapp, setMaskWhatsapp] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("eSimOrderData");
      if (storedData) {
        try {
          const parsedData: OrderData = JSON.parse(storedData);console.log('parsedData', parsedData);
          setOrderData(parsedData);
          
          const formatDate = formatDateToIndonesian(new Date(parsedData.timestamp))
          setFormattedDate(formatDate);
          const formatTime = formatTimeToIndonesianTimezone(new Date(parsedData.timestamp));
          setFormattedTime(formatTime);
          
          if (parsedData.price_raw) {
            const beforeChargePrice = parsedData.price_raw - chargeFeeRaw;
            setDefaultPrice(formatNumberWithDots(beforeChargePrice));
            setDefaultPriceRaw(beforeChargePrice);
            setChargeFee(formatNumberWithDots(chargeFeeRaw));
          }

          if (parsedData.email) setMaskEmail(maskEmailAddress(parsedData.email));
          if (parsedData.whatsapp) setMaskWhatsapp(maskWhatsappNumber(parsedData.whatsapp));   
        } catch (error) {
          console.error("Failed to parse eSimOrderData from localStorage", error);
        }
      }
    }
  }, []);

  return (
    <div className="max-w-[768px] mx-auto flex flex-col min-h-screen bg-gray-100">
      <header className="flex justify-between items-center bg-[#2B3499] text-white pt-3 pb-12 px-3 sm:px-10 w-full top-0 z-0">
        <div className="flex items-center align-center mt-4 mb-3">
          <button
            onClick={() => {
              router.push("/");
            }}
            className="mr-2 cursor-pointer"
            aria-label="Go back">
            <Icon path={mdiChevronLeft} size={1.2} className="font-bold" />
          </button>
          <h1 className="text-xl font-bold">Invoice</h1>
        </div>

        <div className="flex items-center mt-4 mb-3">
          <span className="bg-white text-[#2B3499] w-6 h-6 p-[3px] font-bold text-[13px] border rounded-full text-center">
            <Icon path={mdiCheck} size={0.7} className="font-bold" />
          </span>
          <span className={`bg-white bg-[#7F89E0]"} w-3 h-[2px]`}></span>
          <span className={`bg-white text-[#2B3499] w-6 h-6 p-[3px] font-bold text-[13px] rounded-full text-center`}>
            <Icon path={mdiCheck} size={0.7} className="font-bold" />
          </span>
        </div>
      </header>
      <main className="flex-grow pb-16 z-2">
        <div className="bg-white rounded-[30px] mt-[-30px] p-4 pb-10">
          <div className="flex flex-col items-center justify-center">
            <Icon path={mdiCheckDecagram} size={4.5} className="text-green-500" />
          </div>

          <div className="invoice-summary-wrapper bg-gray-50 pt-10 -mt-15 border-b border-dashed border-b-2">
            <div className="total-price flex mt-18">
              <div className="text-3xl font-bold text-[#2B3499] flex items-center justify-center w-full">
                <div className="text-3xl font-bold text-[#2B3499]">{orderData?.price}</div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-3">
              <p className="text-md text-gray-600 cursor-pointer">No. INV-00019928874</p>
              <span>
                <Icon path={mdiContentCopy} size={0.9} />
              </span>
            </div>

            <div className="status-wrapper w-full mt-3 border-dashed border-t-2 p-3">
              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-gray-500 mt-2 mb-2">Status</div>
                <div className="font-bold text-[#279D38] bg-[#E1FBD6] py-2 px-3 text-xs rounded-md">Berhasil</div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-gray-500 mt-2 mb-2">No. Ref</div>
                <div className="font-bold text-gray-900 text-sm rounded-md">20393848042135</div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-gray-500 mt-2 mb-2">Tgl Transaksi</div>
                <div className="font-bold text-gray-900 text-sm rounded-md">{formattedDate}</div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-gray-500 mt-2 mb-2">Waktu Transaksi</div>
                <div className="font-bold text-gray-900 text-sm rounded-md">{formattedTime} WIB</div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-gray-500 mt-2 mb-2">Metode Pembayaran</div>
                <div className="font-bold text-gray-900 text-sm rounded-md">{orderData?.paymentMethod}</div>
              </div>
            </div>

            <div className="status-wrapper w-full mt-3 border-dashed border-t-2 p-3">
              <div className="flex items-center w-full">
                <h3 className="text-lg font-bold mb-1">Detail Transaksi</h3>
              </div>

              <div className="flex justify-between items-center w-full mt-1">
                <div className="text-sm text-gray-500 mt-2 mb-2">Produk</div>
                <div className="font-bold text-gray-900 text-sm rounded-md">{orderData?.productTitle}</div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-gray-500 mt-2 mb-2">Data Tersedia</div>
                <div className="font-bold text-gray-900 text-sm rounded-md">{orderData?.selectedData}</div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-gray-500 mt-2 mb-2">Jumlah</div>
                <div className="font-bold text-gray-900 text-sm rounded-md">1</div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-gray-500 mt-2 mb-2">Nama Pelanggan</div>
                <div className="font-bold text-gray-900 text-sm rounded-md">{orderData?.nama}</div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-gray-500 mt-2 mb-2">Nomor Whatsapp</div>
                <div className="font-bold text-gray-900 text-sm rounded-md">{maskWhatsapp}</div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-gray-500 mt-2 mb-2">Email</div>
                <div className="font-bold text-gray-900 text-sm rounded-md">{maskEmail}</div>
              </div>

              <div className="mt-3">
                <p className="text-center text-gray-500 text-sm tracking-wider">Kami akan segera mengirimkan kode QR eSIM ke email Anda. Check inbox (atau folder spam) ya!</p>
              </div>
            </div>

            <div className="status-wrapper w-full mt-3 border-dashed border-t-2 p-3">
              <div className="flex items-center w-full">
                <h3 className="text-lg font-bold mb-1">Detail Pembayaran</h3>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-gray-500 mt-2 mb-2">Harga</div>
                <div className="font-bold text-gray-900 text-sm rounded-md">Rp{defaultPrice},00</div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-gray-500 mt-2 mb-2">Biaya Transaksi</div>
                <div className="font-bold text-gray-900 text-sm rounded-md">Rp{chargeFee},00</div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <button onClick={() => router.push("/")} 
              className={`w-full py-3 rounded-full font-bold transition duration-300 bg-[#2B3499] text-white cursor-pointer hover:bg-[#3D50C7]`}>Selesai</button>
          </div>
        </div>
      </main>
    </div>
  );
}
