import { PropertyCardProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import Location from "./Location";
import PropertyRating from "./PropertyRating";
import FavoriteButton from "./FavoriteButton";
import { formatCurrency } from "@/utils/format";

const PropertyCard = ({ property }: { property: PropertyCardProps }) => {
  const {
    name,
    imageUrls,
    lowestPricePerNight,
    numberOfReviews,
    rating,
    city,
    id: propertyID,
    description,
  } = property;

  return (
    <article className="group relative">
      <Link href={`/properties/${propertyID}`}>
        <div className="relative h-[300px] mb-2 overflow-hidden rounded-md">
          <Image
            src={imageUrls[0]}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={name}
            className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex justify-between">
          <h3 className="text-sm font-semibold items-center">
            {name.substring(0, 30)}
          </h3>
          <PropertyRating
            numberOfReviews={
              numberOfReviews ?? Math.floor(Math.random() * 500) + 1
            }
            rating={rating}
            inPage={false}
          />
        </div>
        <p className="text-sm mt-1 text-muted-foreground">
          {description.substring(0, 40)}
        </p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm mt-1">
            <span className="font-semibold">
              Lowest Price: {formatCurrency(lowestPricePerNight ?? 100)}/night
            </span>
          </p>
          <Location city={city} />
        </div>
      </Link>
      <div className="absolute top-5 right-5 z-10">
        <FavoriteButton propertyId={propertyID} />
      </div>
    </article>
  );
};

export default PropertyCard;
