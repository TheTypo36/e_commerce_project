import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import React from "react";

async function SaleBanner() {
  const sales = await getActiveSaleByCouponCode("HAPPYDIWALI50");
  if (!sales?.isActive) return null;

  return <div>{sales?.title}</div>;
}

export default SaleBanner;
