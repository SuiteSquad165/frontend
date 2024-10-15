import cx from "classnames";
import { FaStar } from "react-icons/fa";

const PropertyRating = ({
  rating,
  numberOfReviews,
  inPage,
}: {
  rating: number;
  numberOfReviews: number;
  inPage: boolean;
}) => {
  const countText = numberOfReviews > 1 ? "reviews" : "review";
  const countValue = `${numberOfReviews} ${inPage ? countText : ""}`;

  return (
    <span
      className={cx("flex gap-1 items-center text-xs", {
        "text-base": inPage,
      })}
    >
      <FaStar className="w-3 h-3" /> {rating} ({countValue.trim()})
    </span>
  );
};

export default PropertyRating;
