import { PropertyCardProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import PropertyRating from "@/components/card/PropertyRating";
import { formatCurrency } from "@/utils/format";
import FavoriteButton from "../card/FavoriteButton";

const ItemLayout = ({ property, button }: { property: PropertyCardProps, button:any }) => {
  const {
    name,
    imageUrl,
    pricePerNight,
    numberOfReviews,
    rating,
    city,
    id: propertyID,
    description,
  } = property;

  return (
    <article className="group relative border rounded shadow-md">
        <div className="relative float-left h-[150px] w-[150px] mb-2 rounded-md m-3">
          <Image
            src={imageUrl}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            alt={name}
            className="rounded-md object-cover"
          />
          <div className="absolute top-3 right-3">
            <FavoriteButton propertyID={propertyID}/>
          </div>
        </div>
        <div className="p-5">  
          <div className="flex justify-between">
            <h3 className="text-sm font-semibold items-center">
              {name.substring(0, 30)}
            </h3>
            <PropertyRating
              numberOfReviews={numberOfReviews}
              rating={rating}
              inPage={false}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm mt-1 text-[#00B4D8]">
                <strong>{formatCurrency(pricePerNight)}</strong>/night
              </p>
            </div>
          </div>
          <p>{city}</p>
          <p className="text-sm mt-1 text-muted-foreground max-h-5">
            {description}
          </p>
        </div>
        <div className="float-right">
            {button}
        </div>
    </article>
  );
};

export default ItemLayout;
