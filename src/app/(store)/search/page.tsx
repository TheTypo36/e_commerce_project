import { searchProductsByName } from "@/sanity/lib/Products/searchProductsByName";
import ProductGrid from "@/components/ProductGrid";
import { ProductType } from "../../../../sanity.types"; // Adjust the import path as necessary

// Adjust the import path as necessary
// Import the actual ProductType if it's defined in your project
// If not, define it here to match your Sanity schema
// interface ProductType {
//   _id: string;
//   _type: string;
//   _createdAt: string;
//   _updatedAt: string;
//   _rev: string;
//   name: string;
//   price: number;
//   image?: {
//     asset: {
//       _ref: string;
//     };
//   };
//   slug?: {
//     current: string;
//   };
//   // Add other product fields as needed
// }

export default async function SearchPage({ searchParams }: any) {
  const { query } = searchParams;
  console.log("Search query:", query);
  // Use ProductType[] to match your ProductGrid expectations

  const products: ProductType[] = await searchProductsByName(query);
  // Make sure the results match ProductType[]

  if (!products.length) {
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
        {/* Pass products directly since it's already typed as ProductType[] */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
