import { Button } from "@/components/ui/button";
import { getAllProducts } from "../../sanity/lib/Products/getAllProducts";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/Products/getAllCategories";
// import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import SaleBanner from "@/components/SaleBanner";
export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  // console.log(
  //   crypto.randomUUID().slice(0, 5) +
  //     `>>> rerendered the home page cache with ${products.length} products and ${categories.length} categories`
  // );

  return (
    <div className="">
      <SaleBanner />
      {/* render all the products */}
      <div className="flex flex-col items-center justify-top  min-h-screen bg-gray-100 p-4 w-full">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
