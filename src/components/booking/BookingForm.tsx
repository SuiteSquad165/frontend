"use client";

import { calculateTotals } from "@/utils/calculateTotals";
import { Card, CardTitle } from "@/components/shadcn-ui/card";
import { Separator } from "@/components/shadcn-ui/separator";
import { formatCurrency } from "@/utils/format";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type BookingFormProps = {
  roomName: string; // Add roomName as a prop
};

function BookingForm({ roomName }: BookingFormProps) {
  const { range, price, cleaningFee, serviceFee, taxRate } = useSelector((state: RootState) => state.property);

  if (!range || !range.from || !range.to) return null;

  const checkIn = range.from.toISOString().split("T")[0];
  const checkOut = range.to.toISOString().split("T")[0];

  const { totalNights, subTotal, cleaning, service, orderTotal } =
    calculateTotals({
      checkIn,
      checkOut,
      price,
      cleaning: cleaningFee,
      service: serviceFee,
      taxRate,
    });

  return (
    <Card className="p-8 mb-4">
      <CardTitle className="mb-8">Summary</CardTitle>
      <p className="text-lg font-semibold">{roomName}</p>
      <FormRow label={`$${price} x ${totalNights} nights`} amount={subTotal} />
      <FormRow label="Cleaning Fee" amount={cleaning} />
      <FormRow label="Service Fee" amount={service} />
      <FormRow label={`Tax (${taxRate * 100}%)`} amount={(subTotal + cleaning + service) * (1 + taxRate)} />
      <Separator className="mt-4" />
      <CardTitle className="mt-8">
        <FormRow label="Booking Total" amount={orderTotal} />
      </CardTitle>
    </Card>
  );
}

function FormRow({ label, amount }: { label: string; amount: number }) {
  return (
    <p className="flex justify-between text-sm mb-2">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  );
}

export default BookingForm;
