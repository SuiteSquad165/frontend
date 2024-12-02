import { calculateDaysBetween } from "@/utils/calendar";

type BookingDetails = {
  checkIn: any;
  checkOut: any;
  price: any;
  rewardPoints?: number; // Add optional rewardPoints parameter
};

export const calculateTotals = ({
  checkIn,
  checkOut,
  price,
  rewardPoints = 0, // Default to 0 if not provided
}: BookingDetails) => {
  const totalNights = calculateDaysBetween({ checkIn, checkOut });
  const subTotal = totalNights * price;
  const cleaning = 21;
  const service = 40;
  const tax = subTotal * 0.1;

  const rewardDiscount = rewardPoints / 100.0; // Convert points to currency
  const orderTotal = Math.max(
    subTotal + cleaning + service + tax - rewardDiscount,
    0
  ); // Ensure non-negative total

  return {
    totalNights,
    subTotal,
    cleaning,
    service,
    tax,
    rewardDiscount,
    orderTotal,
  };
};
