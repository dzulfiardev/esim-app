import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberWithDots(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatDateToIndonesian(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTimeToIndonesianTimezone(date: Date): string {
  return date
    .toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta", // Waktu Indonesia Barat timezone
      hour12: false, // Ensure 24-hour format
    })
    .replace(/\./g, ":"); // Replace dots with colons
}

export function maskWhatsappNumber(number: string): string {
  if (number.length <= 4) return number; // If the number is too short, return it as is
  const visiblePart = number.slice(-4); // Get the last 4 digits
  const maskedPart = "*".repeat(number.length - 4); // Mask the rest
  return `${maskedPart}${visiblePart}`;
}

export function maskEmailAddress(email: string): string {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 3) return email; // If the local part is too short, return the email as is
  const visiblePart = localPart.slice(-3); // Get the last 3 characters of the local part
  const maskedPart = "*".repeat(localPart.length - 3); // Mask the rest
  return `${maskedPart}${visiblePart}@${domain}`;
}
