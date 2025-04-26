"use server";

import Razorpay from "razorpay";
import { BasketItem } from "@/store/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    if (!process.env.RAZOR_PAY_KEY_ID || !process.env.RAZOR_PAY_SECRET_KEY) {
      throw new Error("Razorpay credentials are not configured");
    }

    const instance = new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID,
      key_secret: process.env.RAZOR_PAY_SECRET_KEY,
    });

    // Calculate total amount assuming product.price is in INR
    const totalAmount = items.reduce(
      (acc, item) => acc + item.product.price! * item.quantity,
      0
    );

    // Create order options (amount in paise)
    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: metadata.orderNumber,
      notes: {
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
        items: JSON.stringify(
          items.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
          }))
        ),
      },
    };

    const order = await instance.orders.create(options);

    // Return the necessary data for client-side checkout
    return JSON.stringify({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId:
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZOR_PAY_KEY_ID,
      orderNumber: metadata.orderNumber,
      customerName: metadata.customerName,
      customerEmail: metadata.customerEmail,
    });
  } catch (error) {
    console.error("Error creating checkout session", error);
    throw error;
  }
}
