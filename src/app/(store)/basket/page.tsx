"use client";
import AddToBasketButton from "@/components/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { create } from "domain";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import {
  createCheckoutSession,
  Metadata,
} from "../../../../action/createCheckoutSession";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGrouptedItems());
  const { isSignedIn } = useAuth();

  const { user } = useUser();

  const router = useRouter();
  const [isClient, setIsClient] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loader className="animate-spin h-10 w-10 text-blue-500" />;
  }
  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your basket</h1>
        <p className="text-gray-600 text-lg">Your basket is empty.</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName || "unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "unknown",
        clerkUserId: user?.id || "unknown",
      };

      const checkoutData = await createCheckoutSession(groupedItems, metadata);
      const orderData = JSON.parse(checkoutData);
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your Store Name",
        description: "Purchase",
        order_id: orderData.id,
        prefill: {
          name: orderData.customerName,
          email: orderData.customerEmail,
        },
        handler: function (response: any) {
          // Handle successful payment
          router.push("/order/success?orderId=" + orderData.orderNumber);
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to create checkout session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-4 mx-w-6xl]">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems.map((item) => (
            <div
              key={item.product._id}
              className="mb-4 border rounded flex items-center justify-between p-4 border-b border-gray-200"
            >
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? "product iamge"}
                      width={96}
                      className="w-full h-full object-cover rounded"
                      height={96}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold truncate">
                    {item.product.name}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Price: Rs {item.product.price?.toFixed(2)} x {item.quantity}{" "}
                    = Rs{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasketButton product={item.product} />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Items:</span>
              <span>
                {groupedItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </p>
            <p className="flex justify-between text-2xl font-semibold border-t pt-2">
              <span>Total:</span>
              <span>
                Rs {useBasketStore.getState().getTotalPrice().toFixed(2)}
              </span>
            </p>
          </div>
          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-4 w-full bg-blue-500 disabled:bg-gray-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              {isLoading ? "processing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Sign In to Checkout
              </button>
            </SignInButton>
          )}
        </div>
        <div className="h-64 lg:h-0">
          {/* Placeholder for any additional content or space needed */}
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
