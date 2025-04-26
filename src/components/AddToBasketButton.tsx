"use client";
import React, { useEffect } from "react";
import useBasketStore from "@/store/store";
import { ProductType } from "../../sanity.types";

interface AddToBasketButtonProps {
  product: ProductType; // Adjust the type according to your ProductType definition
  disabled?: boolean;
}
function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();

  const ItemCount = getItemCount(product._id);

  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${ItemCount === 0 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"} `}
        disabled={ItemCount === 0 || disabled}
      >
        <span
          className={`text-xl font-bold ${ItemCount === 0 ? "text-gray-400" : "text-green-600"}`}
        >
          -
        </span>
      </button>
      <span className="w-8 text-center font-semibold">{ItemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} `}
        disabled={disabled}
      >
        <span className="text-xl font-bold text-white">+</span>
      </button>
    </div>
  );
}

export default AddToBasketButton;
