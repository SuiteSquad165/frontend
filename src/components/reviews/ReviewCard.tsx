import { Card, CardContent, CardHeader } from "@/components/shadcn-ui/card";
import Rating from "./Rating";
import Comment from "./Comment";
import { LuUser2 } from "react-icons/lu";

type ReviewCardProps = {
  reviewInfo: {
    comment: string;
    rating: number;
    name: string;
    date: any;
  };
  children?: React.ReactNode;
};

const ReviewCard = ({ reviewInfo, children }: ReviewCardProps) => {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <LuUser2 className="w-7 h-7 bg-primary rounded-full text-white" />

            <div className="ml-4">
              <h3 className="text-sm font-bold capitalize mb-1">
                {reviewInfo.name}
              </h3>
              <Rating rating={reviewInfo.rating} />
            </div>
          </div>

          <h3 className="text-sm font-bold capitalize mb-1">
            {reviewInfo.date}
          </h3>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewInfo.comment} />
      </CardContent>
      {/* delete button later */}
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  );
};
export default ReviewCard;
