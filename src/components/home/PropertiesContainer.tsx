"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import EmptyList from "./EmptyList";
import PropertyList from "./PropertyList";
import { useState, useEffect } from "react";

const PropertiesContainer = () => {
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);

  const fetchProperties = async () => {
    try {
      // Fetch from Spring backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/hotels`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch rooms: ${response.status}`);
      }
      const fetchedProperties = await response.json();
      setAllProperties(fetchedProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setAllProperties([]);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []); // Run only once on component mount

  useEffect(() => {
    // Filter properties based on searchTerm
    const filtered = allProperties.filter((property: any) =>
      property.city.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredProperties(filtered);
  }, [searchTerm, allProperties]); // Update filtered properties when searchTerm or allProperties change

  if (allProperties.length === 0) {
    return (
      <>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Loading...</h2>
        </div>
      </>
    );
  } else if (filteredProperties.length === 0) {
    return (
      <EmptyList
        heading="No result."
        message="Try changing or removing some of your filters."
        btnText="Clear Filters"
      />
    );
  }

  return <PropertyList properties={filteredProperties} />;
};

export default PropertiesContainer;
