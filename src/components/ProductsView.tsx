import React from "react";
import { ProductType } from "../../sanity.types";
import { Category } from "../../sanity.types";
import ProductGrid from "./ProductGrid";

import CategorySelector from "./ui/category-selector";
interface ProductsViewProps {
  categories: Category[];
  products: ProductType[];
}
const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div>
      {/* categories*/}
      <div className="flex flex-col">
        <CategorySelector categories={categories} />
      </div>

      {/* products */}
      <div className="flex-1">
        <div>
          <ProductGrid products={products} />
          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
