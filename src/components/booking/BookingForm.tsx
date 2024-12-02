"use client";

import { useEffect, useState } from "react";
import { calculateTotals } from "@/utils/calculateTotals";
import { Card, CardTitle } from "@/components/shadcn-ui/card";
import { Separator } from "@/components/shadcn-ui/separator";
import { formatCurrency } from "@/utils/format";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchUserInfo } from "@/utils/actions";

type BookingFormProps = {
  roomName: string; // Add roomName as a prop
  rewardPoints: number; // Reward points value
  setRewardPoints: React.Dispatch<React.SetStateAction<number>>; // Function to update reward points
};

const BookingForm = ({ roomName }: BookingFormProps) => {
  const { range, price } = useSelector((state: RootState) => state.property);

  const [rewardPoints, setRewardPoints] = useState(0);
  const [maxRewardPoints, setMaxRewardPoints] = useState(1000); // Default max points
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const user = await fetchUserInfo();
        setMaxRewardPoints(user.rewardPoints || 0); // Set available reward points
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  if (loading) {
    return <p>Loading reward points...</p>;
  }

  if (!range || !range.from || !range.to) return null;

  const checkIn = range.from.toISOString().split("T")[0];
  const checkOut = range.to.toISOString().split("T")[0];

  const {
    totalNights,
    subTotal,
    cleaning,
    service,
    tax,
    rewardDiscount,
    orderTotal,
  } = calculateTotals({
    checkIn,
    checkOut,
    price,
    rewardPoints, // Pass reward points to calculate totals
  });

  const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const points = parseInt(e.target.value) || 0;
    setRewardPoints(Math.min(points, maxRewardPoints)); // Prevent exceeding max points
  };

  return (
    <Card className="p-8 mb-4">
      <CardTitle className="mb-8">Summary</CardTitle>
      <p className="text-lg font-semibold">{roomName}</p>
      <FormRow label={`$${price} x ${totalNights} nights`} amount={subTotal} />
      <FormRow label="Cleaning Fee" amount={cleaning} />
      <FormRow label="Service Fee" amount={service} />
      <FormRow label="Tax" amount={tax} />
      <FormRow label="Reward Discount" amount={-rewardDiscount} />

      {/* Reward Input */}
      <div className="mt-4">
        <label
          htmlFor="rewardPoints"
          className="block text-sm font-medium text-gray-700"
        >
          Apply Reward Points
        </label>
        <input
          id="rewardPoints"
          type="number"
          min="0"
          max={maxRewardPoints}
          value={rewardPoints}
          onChange={handleRewardChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          You can apply up to {maxRewardPoints} points. Each 100 points = $1
          discount.
        </p>
      </div>

      <Separator className="mt-4" />
      <CardTitle className="mt-8">
        <FormRow label="Booking Total" amount={orderTotal} />
        <FormRewardRow
          label="Remaining Reward Points"
          amount={maxRewardPoints - rewardPoints}
        />
      </CardTitle>
    </Card>
  );
};

function FormRow({ label, amount }: { label: string; amount: number }) {
  return (
    <p className="flex justify-between text-sm mb-2">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  );
}

function FormRewardRow({ label, amount }: { label: string; amount: number }) {
  return (
    <p className="flex justify-between text-sm mb-2">
      <span>{label}</span>
      <span>{amount}</span>
    </p>
  );
}

export default BookingForm;
