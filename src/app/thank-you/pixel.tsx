"use client";

import { useEffect } from "react";

export default function ThankYouPixel({
  orderId,
  total,
  phone,
}: {
  orderId: string;
  total: number;
  phone: string;
}) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && typeof window.snaptr === "function") {
        window.snaptr("track", "PURCHASE", {
          transaction_id: orderId,
          price: total,
          currency: "SAR",
          user_phone_number: phone,
        });
      }
    } catch {}
  }, [orderId, total, phone]);

  return null;
}
