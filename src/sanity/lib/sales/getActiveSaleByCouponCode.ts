import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getActiveSaleByCouponCode = async (couponCode: string) => {
  const ACTIVE_SALE_QUERY = defineQuery(
    `*[_type == "sale" && couponCode == $couponCode && isActive == true] | order(validFrom desc){
        title,
        description,
        discountAmount,
        couponCode,
        validFrom,
        validUntil,
        isActive
    }[0]`
  );

  try {
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_QUERY,
      params: { couponCode },
    });

    return activeSale ? activeSale.data : null;
  } catch (error) {
    console.error("Error fetching active sale:", error);
    return null;
  }
};
