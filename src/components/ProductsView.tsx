import React from "react";
import { ProductType } from "../../sanity.types";
import { Category } from "../../sanity.types";
interface ProductsViewProps {
  products: ProductType[];
  categories: Category[];
}
const ProductsView = ({ products }: ProductsViewProps) => {
  return (
    <div>
      {/* categories*/}
      <div className="flex flex-col">
        {/* <CategorySelectorComponent categories={categories} /> */}
      </div>

      {/* products */}
      <div className="flex-1">
        <div>
          {/* <ProductGrid products={products} /> */}
          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
