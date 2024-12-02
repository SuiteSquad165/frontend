// import { fetchPropertyReviews } from '@/utils/actions';
import Title from "@/components/properties/Title";

import ReviewCard from "./ReviewCard";
import { fetchHotelReviews } from "@/utils/actions";
const PropertyReviews = async ({ propertyId }: { propertyId: string }) => {
  const reviews = await fetchHotelReviews(propertyId);

  if (reviews.length < 1) return null;
  return (
    <div className="mt-8">
      <Title text="Reviews" />
      <div className="grid md:grid-cols-2 gap-8 mt-4 ">
        {reviews.map((review: any) => {
          const { contents, rating, firstName, reviewDate } = review;
          const reviewInfo = {
            comment: contents,
            rating,
            name: firstName,
            date: reviewDate ? reviewDate.substring(0, 10) : "N/A",
          };
          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
};
export default PropertyReviews;
