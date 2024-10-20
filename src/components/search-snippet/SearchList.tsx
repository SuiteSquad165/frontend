import Link from "next/link";
import { Button } from "../shadcn-ui/button";
import ItemLayout from "./ItemLayout";
import type { PropertyCardProps } from "@/utils/types";

const SearchList = ({ properties }: { properties: PropertyCardProps[] }) => {
  return (
    <section className="mt-2 gap-8 grid">
      {properties.map((property) => {
        return <ItemLayout key={property.id} property={property} button={
          <button className="bg-cyan-400 hover:bg-cyan-500 m-3 p-2 rounded">
            <Link href={`/properties/${property.id}`}><strong className="text-white">Book Now</strong></Link>
          </button>
        } />;
      })}
    </section>
  );
};

export default SearchList;
