"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const RoomDetails = ({
  hotel,
  rooms: roomsDetails,
}: {
  hotel: any;
  rooms: any;
}) => {
  const router = useRouter();

  const [rooms, setRooms] = useState(roomsDetails); // Displayed rooms
  const [sortCriteria, setSortCriteria] = useState<string>(""); // Sorting criteria
  const [filters, setFilters] = useState({ guests: 0, beds: 0 }); // Filters

  // Apply filters and sorting dynamically
  useEffect(() => {
    let filteredRooms = [...roomsDetails]; // Always start with the original roomsDetails

    // Apply filters
    if (filters.guests > 0) {
      filteredRooms = filteredRooms.filter(
        (room: any) => room.guests >= filters.guests
      );
    }
    if (filters.beds > 0) {
      filteredRooms = filteredRooms.filter(
        (room: any) => room.bedrooms >= filters.beds
      );
    }

    // Apply sorting
    filteredRooms = filteredRooms.sort((a: any, b: any) => {
      switch (sortCriteria) {
        case "priceLowToHigh":
          return a.pricePerNight - b.pricePerNight;
        case "priceHighToLow":
          return b.pricePerNight - a.pricePerNight;
        case "ratingHighToLow":
          return b.rating - a.rating;
        case "ratingLowToHigh":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    setRooms(filteredRooms);
  }, [filters, sortCriteria, roomsDetails]);

  const handleSort = (criteria: string) => {
    setSortCriteria(criteria);
  };

  const handleFilterChange = (field: string, value: number) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  return (
    <div className="p-4">
      {/* Property Details */}
      <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
      <p className="text-lg text-gray-600">{hotel.description}</p>

      {/* Filter and Sort Bar */}
      <div className="flex flex-wrap gap-4 justify-between items-center mt-4">
        <p className="text-gray-700">
          Showing {rooms.length} room{rooms.length > 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-4">
          {/* Filter by Guests */}
          <select
            value={filters.guests}
            onChange={(e: any) =>
              handleFilterChange("guests", parseInt(e.target.value))
            }
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Guests</option>
            {[1, 2, 3, 4].map((option) => (
              <option key={option} value={option}>
                {option}+
              </option>
            ))}
          </select>

          {/* Filter by Beds */}
          <select
            value={filters.beds}
            onChange={(e) =>
              handleFilterChange("beds", parseInt(e.target.value))
            }
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Beds</option>
            {[1, 2, 3, 4].map((option) => (
              <option key={option} value={option}>
                {option}+
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortCriteria}
            onChange={(e) => handleSort(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort By</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="ratingHighToLow">Rating: High to Low</option>
            <option value="ratingLowToHigh">Rating: Low to High</option>
          </select>
        </div>
      </div>

      {/* Room List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {rooms.map((room: any) => (
          <div
            key={room.id}
            className="border rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => router.push(`/properties/${hotel.id}/${room.id}`)}
          >
            {/* Room Image */}
            <div className="relative h-48 w-full">
              <Image
                src={room.imageUrls[0] || "https://via.placeholder.com/300"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={room.name}
                className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Room Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{room.name}</h2>
              <p className="text-sm text-gray-500 mb-3">{room.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <div>
                  <p>
                    <strong>Guests:</strong> {room.guests}
                  </p>
                  <p>
                    <strong>Bedrooms:</strong> {room.bedrooms}
                  </p>
                  <p>
                    <strong>Baths:</strong> {room.baths}
                  </p>
                </div>
                <p className="text-green-600 font-bold">
                  ${room.pricePerNight} / night
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomDetails;
