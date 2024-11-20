import EmptyList from "./EmptyList";
import PropertyList from "./PropertyList";

const PropertiesContainer = async () => {
  let properties = [];

  const isServer = typeof window === "undefined";
  const baseURL = isServer ? process.env.NEXT_PUBLIC_API_HOST : "";

  try {
    const response = await fetch(`${baseURL}/rooms`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else properties = await response.json();
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
