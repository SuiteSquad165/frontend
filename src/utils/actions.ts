import { AppDispatch, store } from "@/store";
import { hotelApi, CustomerInfo } from "@/hooks/useData";
import { calculateTotals } from "./calculateTotals";
import { revalidatePath } from "next/cache";
import axios from "axios";
import { getAccessToken } from "./auth";
import generateUniqueId from "generate-unique-id";
import { setBookingDetails } from "@/store/slices/bookingSlice";

export const sendCustomerInfoToBackend = async (customerData: CustomerInfo) => {
  try {
    const result = await store
      .dispatch(hotelApi.endpoints.customerAuth.initiate(customerData))
      .unwrap();
    console.log("Customer info sent to backend successfully:", result);
  } catch (error) {
    console.error("Failed to send customer info:", error);
    throw error;
  }
};

export const fetchListRoomsDetails = async (id: any) => {
  let roomDetails = [];

  try {
    const response = await fetch(
      `http://localhost:8080/hotels/${id}/rooms?ts=${Date.now()}`
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else roomDetails = await response.json();
  } catch (error) {
    console.error(error);
  }
  // console.log(roomDetails);
  return roomDetails;
};

export const fetchHotelDetails = async (id: any) => {
  let hotelDetails = [];

  try {
    const response = await fetch(
      `http://localhost:8080/hotels/${id}?ts=${Date.now()}`
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else hotelDetails = await response.json();
  } catch (error) {
    console.error(error);
  }
  console.log(hotelDetails);
  return hotelDetails;
};

export const fetchRoomDetails = async (hotelId: any, roomId: any) => {
  let roomDetails = [];

  try {
    const response = await fetch(
      `http://localhost:8080/hotels/${hotelId}/rooms/${roomId}?ts=${Date.now()}`
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else roomDetails = await response.json();
  } catch (error) {
    console.error(error);
  }
  return roomDetails;
};

export const fetchReservations = async () => {
  let reservations = [];

  try {
    const accessToken = await getAccessToken(); // Ensure token retrieval
    const response = await axios.get(`/auth/reservations?ts=${Date.now()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Correct Authorization header
      },
    });

    // Ensure data is returned successfully
    reservations = response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
  }

  return reservations;
};

export const fetchHotelReviews = async (hotelId: string) => {
  let hotelReviews = [];

  try {
    const response = await fetch(
      `http://localhost:8080/hotels/${hotelId}/reviews?ts=${Date.now()}`
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else hotelReviews = await response.json();
  } catch (error) {
    console.error(error);
  }
  return hotelReviews;
};

export const createBookingAction =
  (
    prevState: {
      hotelId: string;
      roomId: string;
      checkIn: Date;
      checkOut: Date;
      pricePerNight: number;
      room: any;
      hotel: any;
      rewardPoints: number; // Accept rewardPoints as part of the payload
    },
    router: any
  ) =>
  async (dispatch: AppDispatch) => {
    const {
      hotelId,
      roomId,
      checkIn,
      checkOut,
      pricePerNight,
      hotel,
      room,
      rewardPoints,
    } = prevState;

    const { orderTotal, totalNights } = calculateTotals({
      checkIn,
      checkOut,
      price: pricePerNight,
      rewardPoints,
    });

    const bookingDetails = {
      roomId: roomId,
      hotelId,
      hotel,
      room,
      orderTotal,
      nights: totalNights,
      payment: {
        pointsUsed: 0,
        paymentMethod: "Credit Card",
        paymentStatus: "Success",
      },
      checkIn,
      checkOut,
    };

    const sessionId = generateUniqueId();

    try {
      dispatch(setBookingDetails({ ...bookingDetails, sessionId }));
      router.push(`/checkout?sessionId=${sessionId}`);
    } catch (error) {
      console.error("Error dispatching booking details:", error);
      throw error;
    }
  };

export const cancelReservation = async (id: string) => {
  let cancelationFees = 0;
  try {
    const accessToken = await getAccessToken(); // Ensure token retrieval
    const response = await axios.delete(
      `/auth/reservations/${id}?ts=${Date.now()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Correct Authorization header
        },
      }
    );

    // Ensure data is returned successfully
    cancelationFees = response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
  }

  return cancelationFees;
};

export async function createReviewAction(propertyId: string, formData: any) {
  try {
    // Ensure formData is an instance of FormData
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid formData: Expected FormData instance");
    }

    // Add `reviewDate` to rawData
    const rawData = {
      ...Object.fromEntries(formData.entries()), // Convert FormData to plain object
      reviewDate: new Date().toISOString(), // Add current date-time as ISO string
    };

    const token = await getAccessToken();

    const response = await axios.post(
      `/auth/hotels/${propertyId}/reviews`,
      rawData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return { message: "Review submitted successfully" };
    } else {
      throw new Error("Failed to submit review");
    }
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
}
