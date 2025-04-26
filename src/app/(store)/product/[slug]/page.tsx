import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import { getProductBySlug } from "@/sanity/lib/Products/getProductBySlug";
import { notFound } from "next/navigation";
import React from "react";
import { PortableText } from "next-sanity";
import AddToBasketButton from "@/components/AddToBasketButton";

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log("slug", slug);
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden shadow-lg rounded-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
          {product.image && (
            <Image
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
              src={imageUrl(product.image).url()}
              alt={product.name || "Product Image"}
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black flex items-center justify-center bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
              Rs {product.price?.toFixed(2)}
            </div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>
          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
