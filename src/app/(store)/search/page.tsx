import React from "react";
import { searchProductsByName } from "@/sanity/lib/Products/searchProductsByName";
import ProductGrid from "@/components/ProductGrid";

export default async function SearchPage({
  params,
  searchParams,
}: {
  // Use 'Record<string, never>' instead of '{}' to fix the ESLint error
  params: Record<string, never>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Handle the query parameter safely
  const queryParam = searchParams.query;
  const query =
    typeof queryParam === "string"
      ? queryParam
      : Array.isArray(queryParam)
        ? queryParam[0]
        : "";

  const products = await searchProductsByName(query);

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            No products found for: {query}
          </h1>
          <p className="text-gray-600 text-center">
            Try searching with different keywords
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search Results for: {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
