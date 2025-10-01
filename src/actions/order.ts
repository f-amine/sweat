"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sendOrderToTaager } from "@/lib/taager";

const OrderSchema = z.object({
  firstName: z.string().min(2).max(100),
  phone: z.string().min(6).max(20),
  address: z.string().min(5).max(300),
  bundle: z.enum(["1", "2", "3"]).transform(Number),
  quantity: z.coerce.number().int().min(1).max(99),
});

const PRICES = { 1: 169.0, 2: 199.0, 3: 249.0 } as const;

export type CreateOrderState =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

export async function createOrder(
  prevState: CreateOrderState | undefined,
  formData: FormData,
) {
  const values = Object.fromEntries(formData) as Record<string, string>;
  const parsed = OrderSchema.parse({
    firstName: values.firstName,
    phone: values.phone,
    address: values.address,
    bundle: values.bundle,
    quantity: values.quantity,
  });

  const unitPrice = PRICES[parsed.bundle as 1 | 2 | 3];
  const total = unitPrice * parsed.quantity;

  const order = await prisma.order.create({
    data: {
      firstName: parsed.firstName,
      phone: parsed.phone,
      address: parsed.address,
      bundle: parsed.bundle,
      quantity: parsed.quantity,
      total,
    },
    select: { id: true },
  });

  // Upload to Taager using ACCOUNT_TWO with price reduced by 25
  const taagerPrice = unitPrice - 25;
  const taagerOrderData = {
    productId: "SA040107WT0099",
    receiverName: parsed.firstName,
    phoneNumber: parsed.phone,
    province: "منطقة الرياض",
    streetName: parsed.address,
    cashOnDelivery: taagerPrice * parsed.quantity,
    items: [
      {
        productId: "SA040107WT0099",
        quantity: parsed.quantity,
        price: taagerPrice,
      },
    ],
  };

  try {
    const taagerResult = await sendOrderToTaager(taagerOrderData, "ACCOUNT_TWO");
    if (!taagerResult.success) {
      console.error("Failed to upload order to Taager:", taagerResult.error);
      // Continue with the order creation even if Taager upload fails
    }
  } catch (error) {
    console.error("Error uploading to Taager:", error);
    // Continue with the order creation even if Taager upload fails
  }

  redirect(`/thank-you?order=${order.id}`);
}
