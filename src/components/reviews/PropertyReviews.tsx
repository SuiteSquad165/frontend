"use client";

import { useState, useEffect } from "react";
import Title from "@/components/properties/Title";
import ReviewCard from "./ReviewCard";
import { fetchHotelReviews } from "@/utils/actions";
import SubmitReview from "./SubmitReview";

const PropertyReviews = ({ propertyId }: { propertyId: string }) => {
  const [reviews, setReviews] = useState<any[]>([]);

  // Fetch reviews initially
  const fetchReviews = async () => {
    try {
      const fetchedReviews = await fetchHotelReviews(propertyId);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [propertyId]);

  // Refetch reviews function to pass to SubmitReview
  const refetchReviews = () => {
    fetchReviews();
  };

  if (reviews.length < 1) return null;

  return (
    <div className="mt-8">
      <Title text="Reviews" />
      <SubmitReview
        propertyId={propertyId}
        onReviewSubmitted={refetchReviews}
      />
      <div className="grid md:grid-cols-2 gap-8 mt-8">
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
