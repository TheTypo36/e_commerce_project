import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import React from "react";

async function SaleBanner() {
  const sales = await getActiveSaleByCouponCode("HAPPYDIWALI50");

  return <div>SaleBanner</div>;
}

export default SaleBanner;
