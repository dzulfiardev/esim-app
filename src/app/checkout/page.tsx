"use client";

import Icon from "@mdi/react";
import { mdiChevronLeft, mdiCheck } from "@mdi/js";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import FormComponent from "@/components/Checkout/FormComponent";
import PaymentMethodsComponent from "@/components/Checkout/PaymentMethodsComponent";

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
}

function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [secondStepActive, setSecondStepActive] = useState<boolean>(false);

  useEffect(() => {
    // Check the URL parameter for step
    const stepParam = searchParams.get("step");
    if (stepParam) {
      const parsedStep = parseInt(stepParam, 10);
      if (!isNaN(parsedStep)) {
        setStep(parsedStep);
      }
    } else {
      router.push("/");
      return;
    }

    // handleSecondStepActive();
    if (step < 2) {
      setSecondStepActive(false);
    }
    if (step >= 2) {
      setSecondStepActive(true);
    }

    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("eSimOrderData");
      if (storedData) {
        try {
          const parsedData: OrderData = JSON.parse(storedData);
          setOrderData(parsedData);

          // Format the timestamp to dd-mm-yyyy
          const date = new Date(parsedData.timestamp);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          setFormattedDate(`${day}-${month}-${year}`);

          // Pre-fill form fields if available
          if (parsedData.nama) setNama(parsedData.nama);
          if (parsedData.email) setEmail(parsedData.email);
          if (parsedData.whatsapp) setWhatsapp(parsedData.whatsapp);
        } catch (error) {
          console.error("Failed to parse eSimOrderData from localStorage", error);
        }
      }
    }
  }, [searchParams, router]);

  const isFormValid = () => {
    return nama.trim() !== "" && email.trim() !== "" && whatsapp.trim() !== "";
  };

  function handleSecondStepActive() {
    if (step < 2) {
      setSecondStepActive(false);
    }
    if (step >= 2) {
      setSecondStepActive(true);
    }
  }

  const handleLanjutkan = () => {
    if (step !== 2) {
      const nextStep = step + 1;
      router.push(`/checkout?step=${nextStep}`);
      setStep(nextStep);
      return;
    }

    handleSecondStepActive();

    if (step === 2 && typeof window !== "undefined") {
      const updatedData = {
        ...orderData,
        nama,
        email,
        whatsapp,
        paymentMethod,
      };
      localStorage.setItem("eSimOrderData", JSON.stringify(updatedData));
      router.push("/invoice");
    }
  };

  return (
      <div className="max-w-[768px] bg-[#2B3499] mx-auto flex flex-col min-h-screen bg-gray-100">
        <header className="flex justify-between items-center bg-[#2B3499] text-white pt-3 pb-12 px-3 sm:px-10 w-full top-0 z-0">
          <div className="flex items-center align-center mt-4 mb-3">
            <button
              onClick={() => {
                router.back();
                setStep(step - 1);
              }}
              className="mr-2 cursor-pointer"
              aria-label="Go back">
              <Icon path={mdiChevronLeft} size={1.2} className="font-bold" />
            </button>
            <h1 className="text-xl font-bold">Detail Pemesanan</h1>
          </div>

          <div className="flex items-center mt-4 mb-3">
            <span
              onClick={() => {
                router.push("/checkout?step=1");
                setStep(1);
              }}
              className="bg-white text-[#2B3499] w-6 h-6 p-[1px] font-bold text-[13px] border rounded-full cursor-pointer text-center">
              {secondStepActive ? <Icon path={mdiCheck} size={0.7} className="font-bold mt-[1px] ml-[1px]" /> : "1"}
            </span>
            <span className={`${secondStepActive ? "bg-white" : "bg-[#7F89E0]"} w-3 h-[2px]`}></span>
            <span className={`${secondStepActive ? "bg-white text-[#2B3499]" : "bg-[#7F89E0] text-white"} w-6 h-6 p-[2px] font-bold text-[13px] rounded-full cursor-pointer text-center`}>2</span>
          </div>
        </header>

        <main className="flex-grow pb-16 z-2">
          <div className="bg-white rounded-[30px] mt-[-30px] p-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Ringkasan Paket</h3>
            </div>

            {orderData ? (
              <div>
                <div className="flex direction-row justify-between text-sm text-gray-600 mt-4">
                  <div>
                    <p>Paket Dipilih</p>
                  </div>
                  <div>
                    <p>{orderData.productTitle || "-"}</p>
                  </div>
                </div>

                <div className="flex direction-row justify-between text-sm text-gray-600 mt-4">
                  <div>
                    <p>Data Tersedia</p>
                  </div>
                  <div>
                    <p>{orderData.selectedData || "-"}</p>
                  </div>
                </div>

                <div className="flex direction-row justify-between text-sm text-gray-600 mt-4">
                  <div>
                    <p>Tanggal Pemesanan</p>
                  </div>
                  <div>
                    <p>{formattedDate || "-"}</p>
                  </div>
                </div>

                <div className="flex direction-row justify-between text-sm text-gray-600 mt-4">
                  <div>
                    <p>Jumlah</p>
                  </div>
                  <div>
                    <p>1</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 mt-4">Tidak ada data pemesanan.</p>
            )}

            <div>
              <h3 className="text-xl font-bold mb-2 mt-5 mb-3">Data Pelanggan</h3>
            </div>

            {step === 1 && <FormComponent nama={nama} setNama={setNama} email={email} setEmail={setEmail} whatsapp={whatsapp} setWhatsapp={setWhatsapp} />}

            {step === 2 && <PaymentMethodsComponent paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} price={orderData?.price} priceRaw={orderData?.price_raw} />}

            <div className="mt-8 mb-5">
              <button
                onClick={handleLanjutkan}
                disabled={step === 1 && !isFormValid()}
                className={`w-full py-3 rounded-full font-bold transition duration-300 ${
                  step === 1 && !isFormValid() ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#2B3499] text-white cursor-pointer hover:bg-[#3D50C7]"
                }`}>
                Lanjutkan
              </button>
            </div>
          </div>
        </main>
      </div>
  );
}

export default function CheckoutPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPage />
    </Suspense>
  );
}
