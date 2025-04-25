import { getProductBySlug } from "@/sanity/lib/Products/getProductBySlug";
import { notFound } from "next/navigation";
import React from "react";

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log("slug", slug);
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }
  return <div>ProductPage</div>;
}

export default ProductPage;
