"use client";

import dummyData from "@/utils/dummy-data";
import EmptyList from "../home/EmptyList";
import SearchList from "./SearchList";
import { Button } from "../shadcn-ui/button";
import Image from "next/image";
import filtericon from "./filter.ico"
import { useState } from "react";

const SearchContainer = () => {
  // To Do: Call API get data from database
  // Use dummy data to make this work at first
  const [query, setQuery] = useState("");
  const properties = dummyData;
  const keys = ["name", "city"];

  const search = (data: any[]) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  if (properties.length === 0) {
    return (
      <EmptyList
        heading="No result."
        message="Try changing or removing some of your filters."
        btnText="Clear Filters"
      />
    );
  }

  return (
    <>
      <div className="float-right pl-2">
        <input className="border p-1" placeholder="Search here... " onChange={e=> setQuery(e.target.value)}></input>
        <Button size="icon" asChild>
            <Image src={filtericon} alt="Icon"/>
        </Button>
      </div>
      <SearchList properties={search(properties)} />
    </>
    );
};

export default SearchContainer;
