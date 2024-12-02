import { fetchListRoomsDetails, fetchHotelDetails } from "@/utils/actions";
import RoomDetails from "@/components/properties/RoomDetails";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; // Import revalidatePath from next/cache

interface PropertyDetailsPageProps {
  params: {
    propertyId: string;
  };
}

const PropertyDetailsPage = async ({ params }: PropertyDetailsPageProps) => {
  try {
    // Fetch both room and hotel details in parallel
    const [roomDetails, hotelDetails] = await Promise.all([
      fetchListRoomsDetails(params.propertyId),
      fetchHotelDetails(params.propertyId),
    ]);

    // If either of the details is missing, redirect to home
    if (!roomDetails || !hotelDetails) {
      redirect("/");
    }

    // Trigger revalidation for the current path
    revalidatePath(`/property/${params.propertyId}`);

    return <RoomDetails hotel={hotelDetails} rooms={roomDetails} />;
  } catch (error) {
    console.error("Error fetching property details:", error);
    redirect("/"); // Redirect in case of an error fetching data
  }
};

export default PropertyDetailsPage;
