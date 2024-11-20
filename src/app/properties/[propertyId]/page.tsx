/* eslint-disable */
import Reservation from "@/components/reservation/reservation";
// Page component
export default async function PropertyPage({ params }: { params: any }) {
  const { propertyId } = params;
  let property = [];

  const isServer = typeof window === "undefined";
  const baseURL = isServer ? process.env.NEXT_PUBLIC_API_HOST : "";

  try {
    const response = await fetch(`${baseURL}/rooms/${propertyId}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else property = await response.json();
  } catch (error) {
    console.error(error);
  }
  // Simulate fetching the data using the propertyId from params

  if (!property) {
    return <div>Property not found</div>;
  }

  return <Reservation property={property} />;
}
