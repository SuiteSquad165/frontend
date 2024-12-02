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
import SignInButton from "@/components/auth/SignInButton"; // Adjust path as needed
import { RootState } from "@/store";

function SubmitReview({ propertyId }: { propertyId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLeaveReviewClick = () => {
    if (!user) return; // If the user is not logged in, prevent toggling the review form
    setIsReviewFormVisible((prev) => !prev);
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
              <FormContainer action={createReviewAction}>
                <input type="hidden" name="propertyId" value={propertyId} />
                <RatingInput name="rating" />
                <TextAreaInput
                  name="comment"
                  labelText="feedback"
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
}

export default SubmitReview;
