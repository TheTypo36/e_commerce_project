// import React from "react";
// import { searchProductsByName } from "@/sanity/lib/Products/searchProductsByName";
// import ProductGrid from "@/components/ProductGrid";

// // Define a minimal page component that should work with Next.js
// export default function SearchPage(props: any) {
//   // Extract searchParams safely from props
//   const searchParams = props.searchParams || {};

//   // Handle the query parameter
//   const queryParam = searchParams.query;
//   const query =
//     typeof queryParam === "string"
//       ? queryParam
//       : Array.isArray(queryParam)
//         ? queryParam[0]
//         : "";

//   // Use a React hook to fetch products asynchronously
//   const [products, setProducts] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const result = await searchProductsByName(query);
//         setProducts(result );
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProducts();
//   }, [query]);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
//           <h1 className="text-3xl font-bold mb-6 text-center">Loading...</h1>
//         </div>
//       </div>
//     );
//   }

//   if (!products.length) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
//           <h1 className="text-3xl font-bold mb-6 text-center">
//             No products found for: {query}
//           </h1>
//           <p className="text-gray-600 text-center">
//             Try searching with different keywords
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Search Results for: {query}
//         </h1>
//         <ProductGrid products={products} />
//       </div>
//     </div>
//   );
// }
