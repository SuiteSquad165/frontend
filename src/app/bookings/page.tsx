/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/config";
import { setCurrentUser } from "@/store/slices/authSlice";
import { storeToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";
import {
  fetchReservations,
  fetchHotelDetails,
  fetchRoomDetails,
  cancelReservation,
} from "@/utils/actions";
import { useToast } from "@/hooks/use-toast";

type Reservation = {
  id: string;
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  payment: {
    pointsUsed: number;
    paymentMethod: string;
    paymentStatus: string;
  };
  cancelled: boolean;
  hotel?: {
    name: string;
  };
  room?: {
    name: string;
  };
  nights?: number;
};

const BookingsPage = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      const reservationsData = await fetchReservations();

      const enrichedReservations = await Promise.all(
        reservationsData.map(async (reservation: Reservation) => {
          const hotelDetails = await fetchHotelDetails(reservation.hotelId);
          const roomDetails = await fetchRoomDetails(
            reservation.hotelId,
            reservation.roomId
          );

          const checkInDate = new Date(reservation.checkIn);
          const checkOutDate = new Date(reservation.checkOut);
          const totalNights = Math.ceil(
            (checkOutDate.getTime() - checkInDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          return {
            ...reservation,
            hotel: { name: hotelDetails.name || "Unknown Hotel" },
            room: { name: roomDetails.name || "N/A" },
            nights: totalNights,
          };
        })
      );

      const sortedReservations = enrichedReservations.sort(
        (a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()
      );

      setReservations(sortedReservations);
    };

    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const accessToken = await user.getIdToken(true);
        const expiresAt = jwtDecode<{ exp: number }>(accessToken).exp * 1000;

        storeToken(accessToken, expiresAt);
        dispatch(setCurrentUser({ user, token: accessToken }));

        await fetchReservationDetails();
      } else {
        console.log("No user signed in.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleCancel = async (reservationId: string) => {
    try {
      const cancelationFees = await cancelReservation(reservationId);

      toast({
        title: "Cancellation Note",
        description: `A cancellation fee will be deducted from total if you cancel your reservation.`,
        duration: 5000,
      });

      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === reservationId
            ? {
                ...reservation,
                cancelled: true,
                totalPrice: Math.max(reservation.totalPrice - cancelationFees, 0),
                payment: {
                  ...reservation.payment,
                  paymentStatus: "Refunded",
                },
              }
            : reservation
        )
      );

      toast({
        title: "Cancellation Successful",
        description: `Reservation has been refunded.`,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error canceling reservation:", error);
      toast({
        title: "Cancellation Failed",
        description: "There was an error canceling your reservation.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const isCancelable = (checkInDate: string, cancelled: boolean) => {
    if (cancelled) return false;
    const checkIn = new Date(checkInDate);
    const currentDate = new Date();
    return checkIn > new Date(currentDate.setDate(currentDate.getDate() + 3));
  };

  const roundToTwoDecimalPlaces = (value: number) => {
    return Math.round(value * 100) / 100;
  };

  const formatReservationId = (id: string) => {
    return `...${id.slice(-4)}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Your Bookings
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        </div>
      ) : reservations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Reservation ID</th>
                <th className="py-3 px-6 text-left">Hotel</th>
                <th className="py-3 px-6 text-left">Room</th>
                <th className="py-3 px-6 text-center">Nights</th>
                <th className="py-3 px-6 text-center">Check-in</th>
                <th className="py-3 px-6 text-center">Check-out</th>
                <th className="py-3 px-6 text-center">Total</th>
                <th className="py-3 px-6 text-center">Payment Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {reservations.map((reservation, index) => {
                const isDisabled = !isCancelable(
                  reservation.checkIn,
                  reservation.cancelled
                );

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">
                      {formatReservationId(reservation.id)}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {reservation.hotel?.name || "Unknown Hotel"}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {reservation.room?.name || "N/A"}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {reservation.nights}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {new Date(reservation.checkIn).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {new Date(reservation.checkOut).toLocaleDateString()}
                    </td>
                    <td
                      className={`py-3 px-6 text-center font-bold text-blue-500 ${
                        reservation.cancelled
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      ${roundToTwoDecimalPlaces(reservation.totalPrice)}
                    </td>
                    <td
                      className={`py-3 px-6 text-center font-semibold ${
                        reservation.cancelled
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {reservation.payment.paymentStatus === "Refunded"
                        ? "Refunded"
                        : "Success"}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleCancel(reservation.id)}
                        disabled={isDisabled}
                        className={`${
                          isDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        } text-white font-bold py-2 px-4 rounded`}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          You have no bookings at the moment.
        </p>
      )}
    </div>
  );
};

export default BookingsPage;
