import { Button } from "@/components/ui/button";
import { getAllProducts } from "../../sanity/lib/Products/getAllProducts";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/Products/getAllCategories";
export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  // console.log(
  //   crypto.randomUUID().slice(0, 5) +
  //     `>>> rerendered the home page cache with ${products.length} products and ${categories.length} categories`
  // );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>hello world 123 </h1>

      {/* render all the products */}
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
