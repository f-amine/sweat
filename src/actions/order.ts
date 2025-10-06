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

const PRICES = { 1: 10.0, 2: 15.0, 3: 17.0 } as const;

export type CreateOrderState =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

export async function createOrder(
  prevState: CreateOrderState | undefined,
  formData: FormData,
) {
  const values = Object.fromEntries(formData) as Record<string, string>;
  const parsed = OrderSchema.safeParse({
    firstName: values.firstName,
    phone: values.phone,
    address: values.address,
    bundle: values.bundle,
    quantity: values.quantity,
  });

  if (!parsed.success) {
    console.warn("Order validation failed", parsed.error.flatten());
    return {
      ok: false,
      error: "تعذر إتمام الطلب. يرجى التحقق من صحة البيانات والمحاولة مرة أخرى.",
    } satisfies CreateOrderState;
  }

  const data = parsed.data;
  const bundle = data.bundle as 1 | 2 | 3;

  const unitPrice = PRICES[bundle];
  const total = unitPrice * data.quantity;

  let order;
  try {
    order = await prisma.order.create({
      data: {
        firstName: data.firstName,
        phone: data.phone,
        address: data.address,
        bundle: data.bundle,
        quantity: data.quantity,
        total,
      },
      select: { id: true },
    });
  } catch (error) {
    console.error("Failed to create order:", error);
    return {
      ok: false,
      error: "حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى خلال لحظات.",
    } satisfies CreateOrderState;
  }

  // Taager upload disabled per request. Keeping the block commented for reference.
  // const taagerPrice = unitPrice - 25;
  // const taagerOrderData = {
  //   productId: "SA040107WT0099",
  //   receiverName: data.firstName,
  //   phoneNumber: data.phone,
  //   province: "منطقة الرياض",
  //   streetName: data.address,
  //   cashOnDelivery: taagerPrice * data.quantity,
  //   items: [
  //     {
  //       productId: "SA040107WT0099",
  //       quantity: data.quantity,
  //       price: taagerPrice,
  //     },
  //   ],
  // };

  // try {
  //   const taagerResult = await sendOrderToTaager(taagerOrderData, "ACCOUNT_TWO");
  //   if (!taagerResult.success) {
  //     console.error("Failed to upload order to Taager:", taagerResult.error);
  //     // Continue with the order creation even if Taager upload fails
  //   }
  // } catch (error) {
  //   console.error("Error uploading to Taager:", error);
  //   // Continue with the order creation even if Taager upload fails
  // }

  redirect(`/thank-you?order=${order.id}`);
}
