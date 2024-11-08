import dummyData from "@/utils/dummy-data";
import EmptyList from "./EmptyList";
import PropertyList from "./PropertyList";

const PropertiesContainer = async () => {
  // To Do: Call API get data from database
  // Use dummy data to make this work at first
  let properties = dummyData;
  try {
    const response = await fetch("/rooms");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else properties = await response.json();
    // const properties = dummyData;
  } catch (error) {
    console.error(error);
  }

  if (properties.length === 0) {
    return (
      <EmptyList
        heading="No result."
        message="Try changing or removing some of your filters."
        btnText="Clear Filters"
      />
    );
  }

  return <PropertyList properties={properties} />;
};

export default PropertiesContainer;
