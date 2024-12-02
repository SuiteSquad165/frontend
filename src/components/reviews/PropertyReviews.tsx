// import { fetchPropertyReviews } from '@/utils/actions';
import Title from "@/components/properties/Title";

import ReviewCard from "./ReviewCard";
import { fetchHotelReviews } from "@/utils/actions";
const PropertyReviews = async ({ propertyId }: { propertyId: string }) => {
  const reviews = await fetchHotelReviews(propertyId);
  // const reviews = [
  //   {
  //     profile: { firstName: "Nathan", lastName: "Dinh" },
  //     id: 0,
  //     comment:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur eveniet voluptates hic adipisci mollitia expedita culpa soluta, delectus ratione inventore quibusdam cumque officia corporis, nostrum nulla. Repellat laudantium animi quidem.",
  //     rating: 4,
  //   },
  //   {
  //     profile: { firstName: "Nathan", lastName: "Dinh" },
  //     id: 1,
  //     comment: "ascknakscjiejc",
  //     rating: 5,
  //   },
  // ];
  if (reviews.length < 1) return null;
  return (
    <div className="mt-8">
      <Title text="Reviews" />
      <div className="grid md:grid-cols-2 gap-8 mt-4 ">
        {reviews.map((review: any) => {
          const { contents, rating, profileName, reviewDate } = review;
          const reviewInfo = {
            comment: contents,
            rating,
            name: profileName,
            date: reviewDate,
            // image: profileImage,
          };
          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
};
export default PropertyReviews;
