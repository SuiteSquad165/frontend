import { AppDispatch, store } from "@/store"; // Adjust the path as needed
import { hotelApi, CustomerInfo } from "@/hooks/useData"; // Adjust the path as needed
import dummyData from "./dummy-data";
import { calculateTotals } from "./calculateTotals";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import axios from "axios";
import { getAccessToken } from "./auth";
import generateUniqueId from "generate-unique-id";
import { useDispatch } from "react-redux";
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
  // return dummyData.filter((hotel) => hotel.id === id)[0];
  // let property = [];
  // const isServer = typeof window === "undefined";
  // const baseURL = isServer ? process.env.NEXT_PUBLIC_API_HOST : "";

  // try {
  //   const response = await fetch(`${baseURL}/rooms/${id}`);
  //   if (!response.ok) {
  //     throw new Error(`Response status: ${response.status}`);
  //   } else property = await response.json();
  // } catch (error) {
  //   console.error(error);
  // }

  // return property;

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
    },
    router: any
  ) =>
  async (dispatch: AppDispatch) => {
    console.log("createBookingAction called with prevState:", prevState);

    const { hotelId, roomId, checkIn, checkOut, pricePerNight, hotel, room } =
      prevState;

    const { orderTotal, totalNights } = calculateTotals({
      checkIn,
      checkOut,
      price: pricePerNight,
    });

    const bookingDetails = {
      hotelId,
      roomId,
      nights: totalNights,
      hotel,
      roomsBooked: [
        {
          roomType: room?.name ?? "Unknown Room Type",
          price: pricePerNight,
          quantity: 1,
        },
      ],
      checkIn,
      checkOut,
      totalPrice: orderTotal,
      status: true,
      bookingDate: new Date(),
      payment: {
        pointsUsed: 0,
        paymentMethod: "Credit Card",
        paymentStatus: "Pending",
        paymentDate: undefined,
      },
      cancellationPolicy: {
        allowed: true,
        penaltyFee: 200.0,
        lastCancellationDate: undefined,
      },
    };

    console.log("Generated bookingDetails:", bookingDetails);

    const sessionId = generateUniqueId();

    try {
      dispatch(setBookingDetails({ ...bookingDetails, sessionId }));
      router.push(`/checkout?sessionId=${sessionId}`);
    } catch (error) {
      console.error("Error dispatching booking details:", error);
      throw error;
    }
  };

// export const createBookingAction = async (
//   prevState: {
//     hotelId: string;
//     roomId: string;
//     checkIn: Date;
//     checkOut: Date;
//     pricePerNight: number;
//     room: any;
//     hotel: any;
//   },
//   router: any
// ) => {
//   const { hotelId, roomId, checkIn, checkOut, pricePerNight, room } = prevState;

//   const { orderTotal, totalNights } = calculateTotals({
//     checkIn,
//     checkOut,
//     price: pricePerNight,
//   });

//   // New structure for bookingDetails
//   const bookingDetails = {
//     roomId: roomId,
//     nights: totalNights,
//     payment: {
//       pointsUsed: 0, // Adjust based on your logic
//       paymentMethod: "Credit Card", // Default value
//       paymentStatus: "Pending", // Default to pending
//     },
//     checkIn,
//     checkOut,
//   };

//   try {
//     // Make API call to create reservation
//     const response = await axios.post("/auth/reservations", bookingDetails, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${await getAccessToken()}`,
//       },
//     });

//     console.log(response.data);

//     const bookingId = response.data;

//     if (!bookingId) {
//       throw new Error("Booking ID is undefined or invalid");
//     }

//     const sessionId = generateUniqueId();

//     // Redirect using router.push
//     router.push(`/checkout?sessionId=${sessionId}`);
//   } catch (error) {
//     console.error("Error creating booking:", error);
//   }
// };

export async function createReviewAction(prevState: any, formData: FormData) {
  // const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);

    // const validatedFields = validateWithZodSchema(createReviewSchema, rawData);

    revalidatePath(`/properties/${rawData.propertyId}`);
    return { message: "Review submitted successfully" };
  } catch (error) {
    return console.error(error);
  }
}
