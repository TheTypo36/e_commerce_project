import "server-only";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
export const searchProductsByName = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(
    `*[_type == "productType" && name match $searchParam] | order(name asc)`
  ); // Adjust the query as needed

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: { searchParam: `${searchParam}*` }, // Use wildcard search
    });
    return products.data || [];
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};
