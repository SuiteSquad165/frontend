import BreadCrumbs from "@/components/properties/BreadCrumbs";
import ShareButton from "@/components/properties/SharedButton";
import FavoriteButton from "@/components/card/FavoriteButton";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyRating from "@/components/card/PropertyRating";
import PropertyDetails from "@/components/properties/PropertyDetails";
import HotelInfo from "@/components/properties/HotelInfo";
import { Separator } from "@/components/shadcn-ui/separator";
import Description from "@/components/properties/Description";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import PropertyReviews from "@/components/reviews/PropertyReviews";
import Amenities from "@/components/properties/Amenities";
import SubmitReview from "@/components/reviews/SubmitReview";
import { fetchHotelDetails, fetchRoomDetails } from "@/utils/actions";

const DynamicBookingWrapper = dynamic(
  () => import("@/components/booking/BookingWrapper"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[200px] w-full" />,
  }
);

const RoomDetailsPage = async ({ params }: any) => {
  const { propertyId, roomId } = params;

  try {
    // Fetch both hotel and room details in parallel to avoid multiple fetch calls
    const [hotel, room] = await Promise.all([
      fetchHotelDetails(propertyId),
      fetchRoomDetails(propertyId, roomId),
    ]);

    // Check if either hotel or room details are not found
    if (!room || !hotel) {
      notFound();
    }

    // Room details and property info
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
        <SubmitReview propertyId={hotel.id} />
        <PropertyReviews propertyId={hotel.id} />
      </section>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    notFound();
  }
};

export default RoomDetailsPage;
