// import type { PropertyCardProps } from "./types";
// import { amenities } from "@/utils/amenities";

// const dummyData: Array<PropertyCardProps> = [
//   {
//     id: "1",
//     name: "Oceanview Resort",
//     description: "A beautiful beachfront resort with stunning ocean views.",
//     rating: 4.5,
//     numberOfReviews: 250,
//     city: "Miami, FL",
//     lowestPricePerNight: 200,
//     imageUrl:
//       "https://hoteldel.com/wp-content/uploads/2021/01/hotel-del-coronado-views-suite-K1TOS1-K1TOJ1-1600x900-1.jpg",
//     rooms: [
//       {
//         id: "1-1",
//         name: "Deluxe Ocean View Room",
//         baths: 1,
//         bedrooms: 1,
//         beds: 1,
//         guests: 2,
//         description: "Luxurious room with a king-sized bed and ocean views.",
//         pricePerNight: 200,
//         imageUrl:
//           "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?fm=jpg&q=60&w=3000",
//         amenities: JSON.stringify(
//           amenities.map((amenity, index) => ({
//             ...amenity,
//             selected: index % 2 === 0, // Select every other amenity
//           }))
//         ),
//         bookings: [],
//       },
//       {
//         id: "1-2",
//         name: "Family Suite",
//         baths: 2,
//         bedrooms: 2,
//         beds: 3,
//         guests: 4,
//         description: "Spacious suite perfect for families with a balcony.",
//         pricePerNight: 200,
//         imageUrl:
//           "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?fm=jpg&q=60&w=3000",
//         amenities: JSON.stringify(
//           amenities.map((amenity, index) => ({
//             ...amenity,
//             selected: index % 3 === 0, // Select every third amenity
//           }))
//         ),
//         bookings: [],
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "Mountain Escape",
//     description: "Cozy cabins nestled in the mountains, perfect for a getaway.",
//     rating: 4.8,
//     numberOfReviews: 180,
//     city: "Aspen, CO",
//     lowestPricePerNight: 150,
//     imageUrl:
//       "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000",
//     rooms: [
//       {
//         id: "2-1",
//         name: "Cozy Cabin",
//         baths: 1,
//         bedrooms: 1,
//         beds: 1,
//         guests: 2,
//         description: "Rustic cabin with a wood-burning fireplace.",
//         pricePerNight: 200,
//         imageUrl:
//           "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?fm=jpg&q=60&w=3000",
//         amenities: JSON.stringify(
//           amenities.map((amenity, index) => ({
//             ...amenity,
//             selected: index % 4 === 0, // Select every fourth amenity
//           }))
//         ),
//         bookings: [],
//       },
//       {
//         id: "2-2",
//         name: "Luxe Mountain Lodge",
//         baths: 2,
//         bedrooms: 2,
//         beds: 3,
//         guests: 4,
//         description: "Luxury lodge with stunning mountain views.",
//         pricePerNight: 200,
//         imageUrl:
//           "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?fm=jpg&q=60&w=3000",
//         amenities: JSON.stringify(
//           amenities.map((amenity, index) => ({
//             ...amenity,
//             selected: index % 3 === 0, // Select every third amenity
//           }))
//         ),
//         bookings: [],
//       },
//     ],
//   },
//   {
//     id: "3",
//     name: "City Lights Hotel",
//     description: "Modern rooms located in the heart of the city.",
//     rating: 4.2,
//     numberOfReviews: 320,
//     city: "San Francisco, CA",
//     lowestPricePerNight: 250,
//     imageUrl:
//       "https://images.bubbleup.com/width1920/quality35/mville2017/1-brand/1-margaritaville.com/gallery-media/220803-compasshotel-medford-pool-73868-1677873697-78625-1694019828.jpg",
//     rooms: [
//       {
//         id: "3-1",
//         name: "Urban Studio",
//         baths: 1,
//         bedrooms: 1,
//         beds: 1,
//         guests: 2,
//         description: "Stylish studio apartment with city views.",
//         pricePerNight: 200,
//         imageUrl:
//           "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?fm=jpg&q=60&w=3000",
//         amenities: JSON.stringify(
//           amenities.map((amenity, index) => ({
//             ...amenity,
//             selected: index % 5 === 0, // Select every fifth amenity
//           }))
//         ),
//         bookings: [],
//       },
//       {
//         id: "3-2",
//         name: "Penthouse Suite",
//         baths: 2,
//         bedrooms: 2,
//         beds: 2,
//         guests: 4,
//         description: "Luxurious penthouse with private rooftop access.",
//         pricePerNight: 200,
//         imageUrl:
//           "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?fm=jpg&q=60&w=3000",
//         amenities: JSON.stringify(
//           amenities.map((amenity, index) => ({
//             ...amenity,
//             selected: index % 2 === 0, // Select every other amenity
//           }))
//         ),
//         bookings: [],
//       },
//     ],
//   },
//   {
//     id: "4",
//     name: "Desert Oasis",
//     description: "A unique experience in the desert with luxury amenities.",
//     rating: 4.6,
//     numberOfReviews: 100,
//     city: "Las Vegas, NV",
//     lowestPricePerNight: 300,
//     imageUrl:
//       "https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg",
//     rooms: [
//       {
//         id: "4-1",
//         name: "Luxury Tent",
//         baths: 1,
//         bedrooms: 1,
//         beds: 1,
//         guests: 2,
//         description: "Glamorous tent with a private patio in the desert.",
//         pricePerNight: 200,
//         imageUrl:
//           "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?fm=jpg&q=60&w=3000",
//         amenities: JSON.stringify(
//           amenities.map((amenity, index) => ({
//             ...amenity,
//             selected: index % 4 === 0, // Select every fourth amenity
//           }))
//         ),
//         bookings: [],
//       },
//       {
//         id: "4-2",
//         name: "Desert Villa",
//         baths: 3,
//         bedrooms: 3,
//         beds: 4,
//         guests: 6,
//         description: "Spacious villa with a private pool and desert views.",
//         pricePerNight: 200,
//         imageUrl:
//           "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?fm=jpg&q=60&w=3000",
//         amenities: JSON.stringify(
//           amenities.map((amenity, index) => ({
//             ...amenity,
//             selected: index % 3 === 0, // Select every third amenity
//           }))
//         ),
//         bookings: [],
//       },
//     ],
//   },
//   {
//     id: "5",
//     name: "Countryside Inn",
//     description: "Charming inn located in the peaceful countryside.",
//     rating: 4.3,
//     numberOfReviews: 75,
//     city: "San Jose, CA",
//     lowestPricePerNight: 120,
//     imageUrl:
//       "https://cdn.prod.website-files.com/5c6d6c45eaa55f57c6367749/65046bf150d1abb7e5911702_x-65046bcfdc4f0.webp",
//     rooms: [
//       {
//         id: "5-1",
//         name: "Standard Room",
//         baths: 1,
//         bedrooms: 1,
//         beds: 1,
//         guests: 2,
//         description: "Cozy room with a queen-sized bed and countryside views.",
//         pricePerNight: 200,
//         imageUrl:
//           "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?fm=jpg&q=60&w=3000",
//         amenities: JSON.stringify(
//           amenities.map((amenity, index) => ({
//             ...amenity,
//             selected: index % 2 === 0, // Select every other amenity
//           }))
//         ),
//         bookings: [],
//       },
//       {
//         id: "5-2",
//         name: "Countryside Suite",
//         baths: 2,
//         bedrooms: 2,
//         beds: 2,
//         guests: 4,
//         description: "Spacious suite with a private garden terrace.",
//         pricePerNight: 200,
//         imageUrl:
//           "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?fm=jpg&q=60&w=3000",
//         amenities: JSON.stringify(
//           amenities.map((amenity, index) => ({
//             ...amenity,
//             selected: index % 3 === 0, // Select every third amenity
//           }))
//         ),
//         bookings: [],
//       },
//     ],
//   },
// ];

// export default dummyData;

import type { PropertyCardProps } from "./types";
import { amenities } from "@/utils/amenities";

const dummyData: Array<any> = Array.from({ length: 9 }, (_, hotelIndex) => ({
  id: `${hotelIndex + 1}`,
  name: `Hotel ${hotelIndex + 1}`,
  description: `Description for Hotel ${hotelIndex + 1}.`,
  rating: parseFloat((4 + Math.random() * 0.8).toFixed(1)), // Random rating between 4.0 and 4.8
  numberOfReviews: Math.floor(Math.random() * 500 + 50), // Random reviews between 50 and 500
  city: `City ${hotelIndex + 1}`,
  lowestPricePerNight: Math.floor(Math.random() * 300 + 100), // Random price between 100 and 400
  imageUrl: `https://via.placeholder.com/600x400?text=Hotel+${hotelIndex + 1}`,
  rooms: Array.from({ length: 6 }, (_, roomIndex) => ({
    id: `${hotelIndex + 1}-${roomIndex + 1}`,
    name: `Room ${roomIndex + 1} in Hotel ${hotelIndex + 1}`,
    baths: Math.ceil(Math.random() * 2), // Random baths: 1 or 2
    bedrooms: Math.ceil(Math.random() * 3), // Random bedrooms: 1 to 3
    beds: Math.ceil(Math.random() * 4), // Random beds: 1 to 4
    guests: Math.ceil(Math.random() * 6), // Random guests: 1 to 6
    description: `Description for Room ${roomIndex + 1} in Hotel ${hotelIndex + 1}.`,
    rating: parseFloat((4 + Math.random() * 0.8).toFixed(1)), // Random rating between 4.0 and 4.8
    pricePerNight: Math.floor(Math.random() * 200 + 100), // Random price between 100 and 300
    imageUrl: `https://via.placeholder.com/300x200?text=Room+${hotelIndex + 1}-${roomIndex + 1}`,
    amenities: JSON.stringify(
      amenities.map((amenity, index) => ({
        ...amenity,
        selected: index % (roomIndex + 2) === 0, // Select some amenities based on room index
      }))
    ),
    bookings: [],
  })),
}));

export default dummyData;
