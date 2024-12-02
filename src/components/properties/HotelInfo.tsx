import Image from "next/image";

type HotelInfoProps = {
  profile: {
    profileImage: string;
    hotelName: string;
  };
};

function HotelInfo({ profile: { profileImage, hotelName } }: HotelInfoProps) {
  return (
    <article className="grid grid-cols-[auto,1fr] gap-4 mt-4">
      <Image
        src={profileImage}
        alt={hotelName}
        width={50}
        height={50}
        className="rounded w-12 h-12 object-cover"
      />
      <div>
        <p>
          Property is belong to <span className="font-bold"> {hotelName} </span>{" "}
          hotel.
        </p>
        <p className="text-muted-foreground font-light">
          Superhost &middot; 2 years hosting
        </p>
      </div>
    </article>
  );
}
export default HotelInfo;
