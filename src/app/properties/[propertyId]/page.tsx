// Example: Dummy data for static paths generation
import Reservation from "@/components/reservation/reservation";
import dummyData from "@/utils/dummy-data";
  // Page component
  export default function PropertyPage({ params }:{ params:any }) {
    const { propertyId } = params;
  
    // Simulate fetching the data using the propertyId from params
    const property = dummyData.find((p) => p.id.toString() === propertyId);
  
    if (!property) {
      return <div>Property not found</div>;
    }
  
    return (
      <Reservation property={property}/>
    );
  }
  
  // Use generateStaticParams to return all possible paths
export async function generateStaticParams() {
    return dummyData.map((property) => ({
      propertyId: property.id.toString(),
    }));
}
  