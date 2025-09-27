"use client";

import React, { useEffect, ReactNode } from "react";
import Icon from "@mdi/react";
import { mdiWallet } from "@mdi/js";
// import { useAppSelector } from "@/redux/hooks";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface PaymentMethod {
  label: string;
  icon?: ReactNode;
  img?: string;
  value: string;
}

interface PaymentMethodsComponentProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export default function PaymentMethodsComponent({ paymentMethod, setPaymentMethod }: PaymentMethodsComponentProps) {
  const paymentMethods: PaymentMethod[] = [
    { label: "Saldo", icon: <Icon path={mdiWallet} size={1} />, value: "Saldo" },
    { label: "VA BCA", value: "VA BCA" },
    { label: "VA Mandiri", value: "VA Mandiri" },
    { label: "VA BRI", value: "VA BRI" },
  ];

  useEffect(() => {
    setPaymentMethod(paymentMethods[0].value);
  }, []);

  return (
    <div className="mt-6 border-t border-dashed border-t-2">
      <div className="mt-3">
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          {paymentMethods.map((option) => (
            <div key={option.value} className="flex items-center justify-between p-4 border rounded-lg mb-3 cursor-pointer hover:bg-gray-50" onClick={() => setPaymentMethod(option.value)}>
              <div className="font-bold text-sm flex items-center">
                <span className="mr-1">{option.icon}</span> <span>{option.label}</span>
              </div>
              <div className="flex items-center gap-4">
                {option.value === "Saldo" && <span className="text-md text-gray-500">Rp.200.000</span>}
                <RadioGroupItem value={option.value} className={`h-6 w-6 cursor-pointer ${option.label == paymentMethod ? "border-blue-900" : ""}`} />
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="mt-10">
        <div className="flex direction-row justify-between text-sm text-gray-600 mt-4">
          <div>
            <p>Harga</p>
          </div>
          <div className="font-bold text-sm text-gray-900">
            <p>Rp32.000</p>
          </div>
        </div>

        <div className="flex direction-row justify-between text-sm text-gray-600 mt-4">
          <div>
            <p>Biaya Layanan</p>
          </div>
          <div className="font-bold text-sm text-gray-900">
            <p>Rp500</p>
          </div>
        </div>

        <div className="flex direction-row justify-between mt-4">
          <div className="text-md font-bold text-gray-900">
            <p>Total</p>
          </div>
          <div className="font-bold text-xl text-[#3D50C7]">
            <p>Rp32.500</p>
          </div>
        </div>
      </div>
    </div>
  );
}
