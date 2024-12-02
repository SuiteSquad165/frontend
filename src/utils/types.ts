export type PropertyCardProps = {
  id: string;
  name: string;
  description: string;
  rating: number;
  city: string;
  state: string;
  country: string;
  lowestPricePerNight?: number;
  numberOfReviews?: number;
  contactInfo: {
    phone: string;
    email: string;
    website: string | null;
  };
  amenities: string[];
  imageUrls: string[];
};

export type DateRangeSelect = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type Booking = {
  checkIn: Date;
  checkOut: Date;
};

export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;
