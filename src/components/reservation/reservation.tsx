import { formatCurrency } from "@/utils/format";
import { PropertyCardProps } from "@/utils/types";
import Image from "next/image";
import Location from "../card/Location";
import PropertyRating from "../card/PropertyRating";
import FavoriteButton from "../card/FavoriteButton";
import ReservationForm from "./reservation-form";

const Reservation = ({ property }: { property: PropertyCardProps }) => {
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
    <article className="">
      <strong className="text-center text-[#03045E] text-3xl">
          {name}
      </strong> 
        <div className="float-right">
          <FavoriteButton propertyID={propertyID} />
        </div>
      <div className="flex items-center">        
        <Location city={city}/>
        <p className="pr-5"></p>
        <PropertyRating
            numberOfReviews={numberOfReviews}
            rating={rating}
            inPage={false}
          /> 
      </div>
      
      <div className="relative h-[300px] mb-2 overflow-hidden rounded-md shadow-md">
          <Image
            src={imageUrl}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={name}
            className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex items-center justify-center border shadow-md overflow-hidden rounded-sm">
          <p className="text-smv mt-1 p-2 text-muted-foreground float-left w-4/5">
            {description}
          </p>
          <div className="float-right w-1/5 border rounded-sm">
            <ReservationForm price={formatCurrency(pricePerNight)}/>
          </div>
        </div>
    </article>
  );
};
  
export default Reservation;
  