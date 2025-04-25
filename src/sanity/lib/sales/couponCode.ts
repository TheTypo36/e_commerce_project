export interface CouponCode {
  title: string;
  description: string;
  discountAmount: number;
  couponCode: string;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}
