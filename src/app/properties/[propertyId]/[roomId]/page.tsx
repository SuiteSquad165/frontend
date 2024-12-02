"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/store/slices/authSlice";
import { storeToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import ShareButton from "@/components/properties/SharedButton";
import FavoriteButton from "@/components/card/FavoriteButton";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyRating from "@/components/card/PropertyRating";
import PropertyDetails from "@/components/properties/PropertyDetails";
import HotelInfo from "@/components/properties/HotelInfo";
import { Separator } from "@/components/shadcn-ui/separator";
import Description from "@/components/properties/Description";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import PropertyReviews from "@/components/reviews/PropertyReviews";
import Amenities from "@/components/properties/Amenities";
import { fetchHotelDetails, fetchRoomDetails } from "@/utils/actions";

const DynamicBookingWrapper = dynamic(
  () => import("@/components/booking/BookingWrapper"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[200px] w-full" />,
  }
);

const RoomDetailsPage = ({ params }: any) => {
  const { propertyId, roomId } = params;
  const dispatch = useDispatch();
  const [hotel, setHotel] = useState<any>(null);
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [fetchedHotel, fetchedRoom] = await Promise.all([
          fetchHotelDetails(propertyId),
          fetchRoomDetails(propertyId, roomId),
        ]);

        if (!fetchedHotel || !fetchedRoom) {
          throw new Error("Property or room not found");
        }

        setHotel(fetchedHotel);
        setRoom(fetchedRoom);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const accessToken = await user.getIdToken(true);
        const expiresAt = jwtDecode<{ exp: number }>(accessToken).exp * 1000;

        storeToken(accessToken, expiresAt);
        dispatch(setCurrentUser({ user, token: accessToken }));

        await fetchDetails();
      } else {
        console.log("No user signed in.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [propertyId, roomId, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
      </div>
    );
  }

  if (!hotel || !room) {
    return (
      <p className="text-center text-gray-500 text-lg">
        Property or room details could not be found.
      </p>
    );
  }

  const details = {
    baths: room.baths,
    bedrooms: room.bedrooms ?? 1,
    beds: room.beds,
    guests: room.guests,
  };

  const hotelName = hotel.name;
  const profileImage = hotel.imageUrls[0];

  return (
    <section>
      <BreadCrumbs
        hotelName={hotelName}
        roomName={room.name}
        hotelId={hotel.id}
      />
      <header className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-x-4">
          <ShareButton name={room.name} propertyId={room.id} />
          <FavoriteButton propertyId={room.id} />
        </div>
      </header>
      <ImageContainer mainImage={room.imageUrls[0]} name={hotelName} />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{room.name} </h1>
            <PropertyRating inPage rating={0} numberOfReviews={0} />
          </div>
          <PropertyDetails details={details} />
          <HotelInfo profile={{ hotelName, profileImage }} />
          <Separator className="mt-4" />
          <Description description={room.description ?? "abc"} />
          <Amenities amenities={room.amenities} />
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <DynamicBookingWrapper hotel={hotel} room={room} />
        </div>
      </section>
      <PropertyReviews propertyId={hotel.id} />
    </section>
  );
};

export default RoomDetailsPage;
