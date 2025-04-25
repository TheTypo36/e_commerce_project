import { sanityFetch } from "../live";
import { defineQuery } from "next-sanity";
export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_ID_QUERY = defineQuery(
    `*[_type == "productType" && slug.current == $slug] | order(name asc)`
  );
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: { slug },
    });
    return product.data[0] || null; // Return the first product or null if not found
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};
