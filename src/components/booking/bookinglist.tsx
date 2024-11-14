import Link from "next/link";
import ItemLayout from "../search-snippet/ItemLayout"; 
import type { PropertyCardProps } from "@/utils/types";

const BookingList = ({ properties }: { properties: PropertyCardProps[] }) => {
  return (
    <section className="mt-2 gap-8 grid">
      {properties.map((property) => {
        return (
            <ItemLayout key={property.id} property={property} button={
              <button className="bg-red-500 hover:bg-red-600 m-3 p-2 rounded">
                <strong className="text-white">Cancel</strong>
              </button>
            }/>
        );
      })}
    </section>
  );
};

export default BookingList;
