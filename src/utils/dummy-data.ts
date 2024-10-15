import type { PropertyCardProps } from "./types";

const dummyData: Array<PropertyCardProps> = [
  {
    id: "1",
    name: "Oceanview Resort",
    description: "A beautiful beachfront resort with stunning ocean views.",
    rating: 4.5,
    numberOfReviews: 250,
    city: "Miami, FL",
    pricePerNight: 200,
    imageUrl: "https://example.com/images/oceanview.jpg",
  },
  {
    id: "2",
    name: "Mountain Escape",
    description: "Cozy cabins nestled in the mountains, perfect for a getaway.",
    rating: 4.8,
    numberOfReviews: 180,
    city: "Aspen, CO",
    pricePerNight: 150,
    imageUrl: "https://example.com/images/mountain-escape.jpg",
  },
  {
    id: "3",
    name: "City Lights Hotel",
    description: "Modern rooms located in the heart of the city.",
    rating: 4.2,
    numberOfReviews: 320,
    city: "San Francisco, CA",
    pricePerNight: 250,
    imageUrl: "https://example.com/images/city-lights.jpg",
  },
  {
    id: "4",
    name: "Desert Oasis",
    description: "A unique experience in the desert with luxury amenities.",
    rating: 4.6,
    numberOfReviews: 100,
    city: "Las Vegas, NV",
    pricePerNight: 300,
    imageUrl: "https://example.com/images/desert-oasis.jpg",
  },
  {
    id: "5",
    name: "Countryside Inn",
    description: "Charming inn located in the peaceful countryside.",
    rating: 4.3,
    numberOfReviews: 75,
    city: "San Jose, CA",
    pricePerNight: 120,
    imageUrl: "https://example.com/images/countryside-inn.jpg",
  },
];

export default dummyData;
