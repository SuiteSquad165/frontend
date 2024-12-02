import { calculateDaysBetween } from "@/utils/calendar";

type BookingDetails = {
  checkIn: any;
  checkOut: any;
  price: number;
  cleaning: number;
  service: number;
  taxRate: number;
};

export const calculateTotals = ({
  checkIn,
  checkOut,
  price,
  cleaning,
  service,
  taxRate,
}: BookingDetails) => {
  const totalNights = calculateDaysBetween({ checkIn, checkOut });
  const subTotal = totalNights * price;
  if (!taxRate) taxRate = 0;
  const orderTotal = (subTotal + cleaning + service) * (1 + taxRate);
  return { totalNights, subTotal, cleaning, service, taxRate, orderTotal };
};
