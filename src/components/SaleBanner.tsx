import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import React from "react";

async function SaleBanner() {
  const sales = await getActiveSaleByCouponCode("HAPPYDIWALI50");

  return <div>{sales?.title}</div>;
}

export default SaleBanner;
