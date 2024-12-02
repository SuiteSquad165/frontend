"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { Card } from "@/components/shadcn-ui/card";
import RatingInput from "@/components/form/RatingInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Button } from "@/components/shadcn-ui/button";
import { createReviewAction } from "@/utils/actions";
import SignInButton from "@/components/auth/SignInButton";
import { RootState } from "@/store";
import { useToast } from "@/hooks/use-toast";

const SubmitReview = ({
  propertyId,
  onReviewSubmitted,
}: {
  propertyId: string;
  onReviewSubmitted: () => void;
}) => {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  const handleLeaveReviewClick = () => {
    if (!user) return; // Prevent toggling if not logged in
    setIsReviewFormVisible((prev) => !prev);
  };

  const handleReviewSubmission = async (formData: any) => {
    try {
      const response = await createReviewAction(propertyId, formData);
      if (response?.message) {
        toast({ description: response.message });
        setIsReviewFormVisible(false); // Close the review form on success
        onReviewSubmitted(); // Trigger refetch of reviews
      }
    } catch (error) {
      toast({
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
      console.error("Review submission error:", error);
    }
  };

  return (
    <div className="mt-8">
      {!user ? (
        <SignInButton className="w-auto">
          Sign In to Leave a Review
        </SignInButton>
      ) : (
        <>
          <Button onClick={handleLeaveReviewClick}>
            {isReviewFormVisible ? "Cancel Review" : "Leave a Review"}
          </Button>
          {isReviewFormVisible && (
            <Card className="p-8 mt-8">
              <FormContainer action={handleReviewSubmission}>
                <input type="hidden" name="propertyId" value={propertyId} />
                <RatingInput name="rating" />
                <TextAreaInput
                  name="contents"
                  labelText="Feedback"
                  defaultValue="Amazing place !!!"
                />
                <SubmitButton text="Submit" className="mt-4" />
              </FormContainer>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default SubmitReview;
