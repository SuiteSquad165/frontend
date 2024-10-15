import dummyData from "@/utils/dummy-data";
import EmptyList from "./EmptyList";
import PropertyList from "./PropertyList";

const PropertiesContainer = () => {
  // To Do: Call API get data from database
  // Use dummy data to make this work at first

  const properties = dummyData;

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
