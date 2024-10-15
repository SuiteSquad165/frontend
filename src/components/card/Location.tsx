import { FaMapPin } from "react-icons/fa";

const Location = ({ city }: { city: string }) => {
  return (
    <span className="flex justify-between items-center gap-2 text-sm">
      <FaMapPin />
      {city}
    </span>
  );
};

export default Location;
