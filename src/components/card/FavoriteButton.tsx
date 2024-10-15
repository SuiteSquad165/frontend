import { FaHeart } from "react-icons/fa";
import { Button } from "../shadcn-ui/button";

const FavoriteButton = ({ propertyID }: { propertyID: string }) => {
  return (
    <Button size="icon" variant="outline" className="p-2 cursor-pointer">
      <FaHeart />
    </Button>
  );
};

export default FavoriteButton;
